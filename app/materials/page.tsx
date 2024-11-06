"use client";

import { useState, useMemo } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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

const departments = [
  "All",
  "Information Technology",
  "Computer Science",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
];
const semesters = ["All", "1", "2", "3", "4", "5", "6", "7", "8"];

export default function Materials() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [department, setDepartment] = useState("All");
  const [semester, setSemester] = useState("All");

  const {
    data: materials,
    isLoading,
    error,
  } = useQuery<Material[]>({
    queryKey: ["materials"],
    queryFn: async () => {
      const response = await axios.get("/materials");
      return response.data;
    },
  });

  const filteredMaterials = useMemo(() => {
    if (!materials) return [];

    const searchWords = searchKeyword
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    return materials.filter((material) => {
      const matchesDepartment =
        department === "All" || material.department === department;
      const matchesSemester =
        semester === "All" || material.semester.toString() === semester;

      const matchesKeyword =
        searchWords.length === 0 ||
        searchWords.some(
          (word) =>
            material.title.toLowerCase().includes(word) ||
            material.description.toLowerCase().includes(word)
        );

      return matchesDepartment && matchesSemester && matchesKeyword;
    });
  }, [materials, department, semester, searchKeyword]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useMemo hook
  };

  if (error) return <div className="container py-10">An error occurred</div>;

  return (
    <div className="container py-10 ">
      <h1 className="text-3xl font-bold mb-6">Study Materials</h1>
      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col sm:flex-row gap-4"
      >
        <Input
          placeholder="Search materials..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-grow"
        />
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((sem) => (
              <SelectItem key={sem} value={sem}>
                {sem === "All" ? "All Semesters" : `Semester ${sem}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full sm:w-auto">
          Search
        </Button>
      </form>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Departments</h2>
        <ScrollArea className="w-full">
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Badge
                key={dept}
                variant={department === dept ? "default" : "outline"}
                className="cursor-pointer px-2 py-1"
                onClick={() => setDepartment(dept)}
              >
                {dept}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </div>
      <hr />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Skeleton loader
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="flex flex-col mt-6">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-[100px] w-full rounded-md" />
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-9 w-full sm:w-[100px]" />
              </CardFooter>
            </Card>
          ))
        ) : filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <Card key={material._id} className="flex flex-col mt-6">
              <CardHeader>
                <CardTitle className="text-lg">{material.title}</CardTitle>
                <CardDescription>
                  Department: {material.department}, Semester:{" "}
                  {material.semester}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                  <p>{material.description}</p>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Uploaded by: {material.uploadedBy.name}
                </p>
                <Button asChild className="w-full sm:w-auto">
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
          ))
        ) : (
          <h1 className="text-xl font-semibold mt-6 ">No Materials Found</h1>
        )}
      </div>
    </div>
  );
}
