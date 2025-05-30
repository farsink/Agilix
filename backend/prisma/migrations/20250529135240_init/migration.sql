-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "stackauthUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "profileData" JSONB NOT NULL DEFAULT '{}',
    "fitnessGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_stackauthUserId_key" ON "User"("stackauthUserId");

-- CreateIndex
CREATE INDEX "idx_users_stackauth_id" ON "User"("stackauthUserId");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "User"("email");
