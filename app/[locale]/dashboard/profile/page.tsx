import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, Key, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  // Mock user data (replace with real auth once database is set up)
  const user = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    createdAt: new Date(),
    emailVerified: true,
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Profile Header */}
      <div className="glass rounded-2xl p-8 border border-white/10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 bg-gradient-to-br from-sky-500 to-emerald-500">
            <AvatarFallback className="text-3xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
                {user.role}
              </Badge>
            </div>

            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
                {user.emailVerified && (
                  <Badge variant="outline" className="ml-2 border-emerald-500 text-emerald-500">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile */}
      <Card className="glass border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-sky-500" />
            <CardTitle className="text-white">Profile Information</CardTitle>
          </div>
          <CardDescription className="text-slate-400">Update your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Full Name
            </Label>
            <Input id="name" defaultValue={user.name} className="bg-slate-800/50 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={user.email}
              className="bg-slate-800/50 border-white/10 text-white"
            />
          </div>
          <Button className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="glass border-white/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-sky-500" />
            <CardTitle className="text-white">Change Password</CardTitle>
          </div>
          <CardDescription className="text-slate-400">Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current" className="text-slate-300">
              Current Password
            </Label>
            <Input id="current" type="password" className="bg-slate-800/50 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new" className="text-slate-300">
              New Password
            </Label>
            <Input id="new" type="password" className="bg-slate-800/50 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-slate-300">
              Confirm New Password
            </Label>
            <Input id="confirm" type="password" className="bg-slate-800/50 border-white/10 text-white" />
          </div>
          <Button className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600">
            Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
