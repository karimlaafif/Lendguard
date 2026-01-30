import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Starting database seed...")

    // Create admin user
    const adminPassword = await bcrypt.hash("Admin123!@#", 12)
    const admin = await prisma.user.upsert({
        where: { email: "admin@lendguard.ai" },
        update: {},
        create: {
            email: "admin@lendguard.ai",
            name: "Admin User",
            password: adminPassword,
            role: "ADMIN",
            emailVerified: new Date(),
        },
    })
    console.log("✅ Created admin user:", admin.email)

    // Create test user
    const testPassword = await bcrypt.hash("User123!@#", 12)
    const testUser = await prisma.user.upsert({
        where: { email: "user@test.com" },
        update: {},
        create: {
            email: "user@test.com",
            name: "Test User",
            password: testPassword,
            role: "USER",
            emailVerified: new Date(),
        },
    })
    console.log("✅ Created test user:", testUser.email)

    console.log("🎉 Database seeding completed!")
    console.log("\n📝 Test Credentials:")
    console.log("Admin: admin@lendguard.ai / Admin123!@#")
    console.log("User: user@test.com / User123!@#")
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
