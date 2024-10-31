"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Material {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  department: string;
  semester: number;
  uploadedBy: {
    name: string;
  };
}

export default function Materials() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const {
    data: materials,
    isLoading,
    error,
  } = useQuery<Material[]>({
    queryKey: ["materials", searchKeyword, department, semester],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchKeyword) params.append("keyword", searchKeyword);
      if (department) params.append("department", department);
      if (semester) params.append("semester", semester);
      const response = await axios.get(`/materials?${params.toString()}`);
      return response.data;
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger re-fetch by updating the query key
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Study Materials</h1>
      <form onSubmit={handleSearch} className="mb-6 flex gap-4 flex-wrap">
        <Input
          placeholder="Search materials..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-grow"
        />
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
          </SelectContent>
        </Select>
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <SelectItem key={sem} value={sem.toString()}>
                Semester {sem}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </form>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {materials?.map((material) => (
          <Card key={material._id}>
            <CardHeader>
              <CardTitle>{material.title}</CardTitle>
              <CardDescription>
                Department: {material.department}, Semester: {material.semester}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{material.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
