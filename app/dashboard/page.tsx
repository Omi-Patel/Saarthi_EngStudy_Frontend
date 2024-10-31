"use client";

import { useAuth } from "@/lib/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProtectedRoute } from "../_components/ProtectedRoute";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Welcome, {user?.name} 👋</CardTitle>
            <CardDescription>
              Your role:{" "}
              <span className=" uppercase">{user?.role}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Department: {user?.department}</p>
            <p>Semester: {user?.semester}</p>
            {user?.role === "student" && (
              <div className="mt-4">
                <p>
                  To upload materials, you need to be a student admin or admin.
                </p>
                <Button asChild className="mt-2">
                  <Link href="/request-admin">Request Admin Access</Link>
                </Button>
              </div>
            )}
            {(user?.role === "student_admin" || user?.role === "admin") && (
              <div className="mt-4">
                <Button asChild>
                  <Link href="/upload-material">Upload Material</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
