"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Folder,
  Upload,
  FileText,
  Users,
  CheckCircle,
  UserPlus,
  UserCheck,
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex mx-auto max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Your Engineering Study Companion
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Access all your engineering study materials in one place. Organized,
            searchable, and always up-to-date.
          </p>
          <div className="space-x-4">
            <Link href="/materials">
              <Button size="lg">Browse Materials</Button>
            </Link>
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            EngStudy provides a comprehensive platform for engineering students
            to access and manage their study materials.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card>
            <CardContent className="flex h-[180px] flex-col justify-between p-6">
              <Search className="h-6 w-6" />
              <div className="space-y-2">
                <h3 className="font-bold">Easy Search</h3>
                <p className="text-sm text-muted-foreground">
                  Quickly find the materials you need with our powerful search
                  feature.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex h-[180px] flex-col justify-between p-6">
              <Folder className="h-6 w-6" />
              <div className="space-y-2">
                <h3 className="font-bold">Organized Content</h3>
                <p className="text-sm text-muted-foreground">
                  Materials are neatly organized by department and semester for
                  easy navigation.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex h-[180px] flex-col justify-between p-6">
              <Upload className="h-6 w-6" />
              <div className="space-y-2">
                <h3 className="font-bold">Easy Uploads</h3>
                <p className="text-sm text-muted-foreground">
                  Student admins can easily upload and manage study materials
                  for their peers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section
        id="user-guide"
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            How to Become a Student Admin and Upload Materials
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Follow these steps to contribute study materials to our platform.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 mb-2" />
              <CardTitle>1. Register as a Student</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sign up for an account on our platform. All new users start with
                a student role.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <UserPlus className="h-8 w-8 mb-2" />
              <CardTitle>2. Request Student_Admin Role</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Navigate to your dashboard and find the Request Student_Admin
                option. Submit a request explaining why you&apos;d like to
                become a student admin.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <UserCheck className="h-8 w-8 mb-2" />
              <CardTitle>3. Await Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                An administrator will review your request. If approved, your
                role will be updated to student_admin.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 mb-2" />
              <CardTitle>4. Prepare Your Material</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Once approved as a student_admin, prepare your study material.
                Ensure it&apos;s in a common file format (PDF, Image only.) and
                free of copyright issues.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Upload className="h-8 w-8 mb-2" />
              <CardTitle>5. Upload Material</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Go to your dashboard and find the{" "}
                <span className="font-bold">Upload Material</span> button. Fill
                in the details like title, description, department, and
                semester.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CheckCircle className="h-8 w-8 mb-2" />
              <CardTitle>6. Publish and Share</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Review the details and file. Click{" "}
                <span className="font-bold">Publish</span> to make the material
                available to other students on the platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
