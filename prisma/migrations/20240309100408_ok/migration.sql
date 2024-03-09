-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "bidPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerId" INTEGER,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "nickName" TEXT,
    "threshold" INTEGER NOT NULL DEFAULT 300000000,
    "groupId" TEXT,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keys" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekInfos" (
    "id" SERIAL NOT NULL,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weekInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekDatas" (
    "id" SERIAL NOT NULL,
    "weekInfoId" INTEGER NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "bidPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tueAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "wedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "thuAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "friAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "satAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sunAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "restAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weekDatas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "realAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "weekDataId" INTEGER NOT NULL,
    "adminId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bankAccounts" (
    "id" SERIAL NOT NULL,
    "nameOwner" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bankAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "keys_name_key" ON "keys"("name");

-- CreateIndex
CREATE UNIQUE INDEX "keys_key_key" ON "keys"("key");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekDatas" ADD CONSTRAINT "weekDatas_weekInfoId_fkey" FOREIGN KEY ("weekInfoId") REFERENCES "weekInfos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekDatas" ADD CONSTRAINT "weekDatas_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_weekDataId_fkey" FOREIGN KEY ("weekDataId") REFERENCES "weekDatas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "keys" ("name", "key", "createdAt", "updatedAt") VALUES ('JWT_SECRET', 'kAuoM1TpLKGjJD8SYEoUSzHh9DGxdO3T', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO "keys" ("name", "key", "createdAt", "updatedAt") VALUES ('API_KEY', 'HItR0mYbvy6coCrazBDEByTtuxpacSE0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
