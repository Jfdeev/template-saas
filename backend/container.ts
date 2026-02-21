import "server-only";

import type { CreateConceptualProductInput } from "@/backend/domain/products/models";
import type { PixQrCode } from "@/backend/ports/payments";
import type { AbacateWebhook } from "@/backend/application/payments/handle-webhook";

import { getDb } from "@/backend/infra/db";
import { makeDrizzleCreateConceptualProductPort, makeDrizzleProductsPorts } from "@/backend/adapters/drizzle/products";
import {
  makeDrizzlePaymentWebhookEventsRepository,
  makeDrizzlePaymentsRepository,
  makeDrizzleUsersRepository,
} from "@/backend/adapters/drizzle/payments";
import { abacatepayFetch } from "@/backend/adapters/abacatepay/client";

import { createConceptualProduct } from "@/backend/application/products/create-conceptual-product";
import { getProductsPageData } from "@/backend/application/products/get-products-page-data";
import { getDashboardData } from "@/backend/application/dashboard/get-dashboard-data";
import { createPixQrCodeForUser as createPixQrCodeUseCase } from "@/backend/application/payments/create-pix-qrcode";
import { handleAbacatepayWebhook as handleWebhookUseCase } from "@/backend/application/payments/handle-webhook";

function getPaymentConfig() {
  const configured = process.env.ABACATEPAY_PRICE_CENTS;
  const amountCents = configured ? Number(configured) : 590;
  if (!Number.isInteger(amountCents) || amountCents <= 0) {
    throw new Error("Invalid ABACATEPAY_PRICE_CENTS");
  }

  return {
    amountCents,
    expiresInSeconds: 60 * 60,
    description: process.env.ABACATEPAY_DESCRIPTION ?? "Pagamento avulso",
  };
}

export async function getProductsDataForUser(userId: string) {
  const db = getDb();
  const ports = makeDrizzleProductsPorts(db);
  return getProductsPageData(ports, userId);
}

export async function createProductForUser(userId: string, input: CreateConceptualProductInput) {
  const db = getDb();
  const port = makeDrizzleCreateConceptualProductPort(db);
  return createConceptualProduct(port, userId, input);
}

export async function getDashboardDataForUser(userId: string) {
  const db = getDb();
  const ports = makeDrizzleProductsPorts(db);
  return getDashboardData(ports, userId);
}

export async function createPixPaymentForUser(userId: string) {
  const db = getDb();
  const paymentsRepo = makeDrizzlePaymentsRepository(db);
  const config = getPaymentConfig();

  const gateway = {
    async createPixQrCode(input: {
      amount: number;
      expiresIn: number;
      description: string;
      metadata: Record<string, string>;
    }): Promise<PixQrCode> {
      return abacatepayFetch<PixQrCode>("/pixQrCode/create", {
        method: "POST",
        body: JSON.stringify(input),
      });
    },
  };

  return createPixQrCodeUseCase({ gateway, payments: paymentsRepo }, userId, config);
}

export async function handleAbacatepayWebhook(payload: AbacateWebhook) {
  const db = getDb();
  const deps = {
    webhookEvents: makeDrizzlePaymentWebhookEventsRepository(db),
    payments: makeDrizzlePaymentsRepository(db),
    users: makeDrizzleUsersRepository(db),
  };

  return handleWebhookUseCase(deps, payload);
}
