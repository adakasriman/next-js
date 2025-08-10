-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "google_auth_sub" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_number" TEXT,
    "user_type" TEXT,
    "meta_status" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_data" JSONB,
    "status" TEXT,
    "supabase_auth_id" TEXT,
    "secondary_email" TEXT,
    "is_id_verified" BOOLEAN,
    "secondary_phone_number" TEXT,
    "address" TEXT,
    "id_number" TEXT,
    "id_type" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Property" (
    "property_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street_address" TEXT,
    "locality" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" VARCHAR(6) NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "property_type" TEXT,
    "default_monthly_maintenance_fee" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "maintenance_fee_per_sft" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "meta_status" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_data" JSONB,
    "status" TEXT,
    "total_documents_count" INTEGER NOT NULL DEFAULT 0,
    "total_documents_size_bytes" BIGINT NOT NULL DEFAULT 0,
    "allowed_documents_size_bytes" BIGINT NOT NULL DEFAULT 1073741824,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "public"."Unit" (
    "unit_id" TEXT NOT NULL,
    "owner_id" TEXT,
    "property_id" TEXT NOT NULL,
    "unit_number_or_name" TEXT NOT NULL,
    "floor_number" TEXT,
    "bedrooms" INTEGER,
    "bathrooms" DECIMAL(3,1),
    "square_footage" DECIMAL(10,2),
    "monthly_maintenance_fee" DECIMAL(10,2),
    "occupancy_status" TEXT,
    "meta_status" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vehicle_parking_space" TEXT,
    "total_due" INTEGER NOT NULL DEFAULT 0,
    "unit_balance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("unit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_supabase_auth_id_key" ON "public"."User"("supabase_auth_id");

-- AddForeignKey
ALTER TABLE "public"."Unit" ADD CONSTRAINT "Unit_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Unit" ADD CONSTRAINT "Unit_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."Property"("property_id") ON DELETE CASCADE ON UPDATE CASCADE;
