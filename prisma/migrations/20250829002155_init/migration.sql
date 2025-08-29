-- AlterTable
ALTER TABLE "public"."USER" ADD COLUMN     "EmailVerified" TIMESTAMP(3),
ADD COLUMN     "Image" TEXT,
ADD COLUMN     "Name" TEXT,
ALTER COLUMN "Firstname" DROP NOT NULL,
ALTER COLUMN "Lastname" DROP NOT NULL,
ALTER COLUMN "Password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."ACCOUNT" (
    "USER_ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "ACCOUNT_pkey" PRIMARY KEY ("provider","provider_account_id")
);

-- CreateTable
CREATE TABLE "public"."SESSION" (
    "session_token" TEXT NOT NULL,
    "USER_ID" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."VERIFICATION_TOKEN" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VERIFICATION_TOKEN_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "SESSION_session_token_key" ON "public"."SESSION"("session_token");

-- AddForeignKey
ALTER TABLE "public"."ACCOUNT" ADD CONSTRAINT "ACCOUNT_USER_ID_fkey" FOREIGN KEY ("USER_ID") REFERENCES "public"."USER"("USER_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SESSION" ADD CONSTRAINT "SESSION_USER_ID_fkey" FOREIGN KEY ("USER_ID") REFERENCES "public"."USER"("USER_ID") ON DELETE CASCADE ON UPDATE CASCADE;
