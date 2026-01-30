import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create Admin User
    const adminPassword = await bcrypt.hash('Admin123!@#', 12)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@lendguard.ai' },
        update: {
            password: adminPassword,
            role: 'ADMIN',
        },
        create: {
            email: 'admin@lendguard.ai',
            password: adminPassword,
            name: 'Admin User',
            role: 'ADMIN',
            emailVerified: new Date(),
        },
    })

    // Create Test User
    const userPassword = await bcrypt.hash('User123!@#', 12)
    const user = await prisma.user.upsert({
        where: { email: 'user@test.com' },
        update: {
            password: userPassword,
            role: 'USER',
        },
        create: {
            email: 'user@test.com',
            password: userPassword,
            name: 'Test User',
            role: 'USER',
            emailVerified: new Date(),
        },
    })

    console.log('✅ Seed data created:')
    console.log('\n🔐 ADMIN ACCOUNT:')
    console.log('   Email: admin@lendguard.ai')
    console.log('   Password: Admin123!@#')
    console.log('\n👤 TEST USER ACCOUNT:')
    console.log('   Email: user@test.com')
    console.log('   Password: User123!@#')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
