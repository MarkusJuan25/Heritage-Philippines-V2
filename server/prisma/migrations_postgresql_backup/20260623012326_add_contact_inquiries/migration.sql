-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'received',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT '',
    "inquiryType" TEXT NOT NULL DEFAULT '',
    "destination" TEXT NOT NULL DEFAULT '',
    "startDate" TEXT NOT NULL DEFAULT '',
    "endDate" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'contact-page',
    "notificationStatus" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactInquiry_email_idx" ON "ContactInquiry"("email");

-- CreateIndex
CREATE INDEX "ContactInquiry_status_idx" ON "ContactInquiry"("status");

-- CreateIndex
CREATE INDEX "ContactInquiry_createdAt_idx" ON "ContactInquiry"("createdAt");
