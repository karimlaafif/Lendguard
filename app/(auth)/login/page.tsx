'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function LoginPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                toast({
                    title: 'Error',
                    description: 'Invalid email or password',
                    variant: 'destructive',
                })
            } else {
                toast({
                    title: 'Success',
                    description: 'Logged in successfully',
                })
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Login to LendGuard AI</h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="admin@lendguard.ai"
                            disabled={loading}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Admin123!@#"
                            disabled={loading}
                            className="w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-900 border border-blue-100">
                    <p className="font-semibold mb-2">Test Accounts:</p>
                    <div className="space-y-1">
                        <p>Admin: <code className="bg-blue-100 px-1 rounded">admin@lendguard.ai</code> / <code className="bg-blue-100 px-1 rounded">Admin123!@#</code></p>
                        <p>User: <code className="bg-blue-100 px-1 rounded">user@test.com</code> / <code className="bg-blue-100 px-1 rounded">User123!@#</code></p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
