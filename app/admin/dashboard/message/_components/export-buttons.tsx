"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileSpreadsheetIcon,
  FileTextIcon,
  ChevronDown,
  Share2,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import type { Message } from "@/types/message";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonsProps {
  tableRef: React.RefObject<HTMLTableElement | null>;
  data: Message[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ExportButtons({ tableRef, data }: ExportButtonsProps) {
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();

      // Add title
      const title = "Messages List";
      doc.setFontSize(18);
      doc.text(title, 14, 22);

      // Add date
      const date = new Date().toLocaleDateString();
      doc.setFontSize(11);
      doc.text(`Generated on: ${date}`, 14, 30);

      // Format data for PDF export
      const tableColumn = ["#", "Name", "Email", "Status", "Date", "Message"];
      const tableRows = data.map((message, index) => [
        index + 1,
        message.name,
        message.email,
        message.status,
        new Date(message.timestamp).toLocaleDateString(),
        message.message.length > 50
          ? message.message.substring(0, 50) + "..."
          : message.message,
      ]);

      // Generate the PDF table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { top: 35 },
      });

      doc.save(`Messages - ${date}.pdf`);
      toast.success("Messages exported to PDF!");
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toast.error("Failed to export to PDF");
    }
  };

  const exportToExcel = () => {
    try {
      // Format data for Excel export
      const formattedData = data.map((message) => ({
        ID: message.id,
        Name: message.name,
        Email: message.email,
        Message: message.message,
        Date: new Date(message.timestamp).toLocaleString(),
        Status: message.status,
      }));

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Messages");
      const date = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      XLSX.writeFile(wb, `Messages - ${date}.xlsx`);
      toast.success("Messages exported to Excel!");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export to Excel");
    }
  };

  const exportToCSV = () => {
    try {
      // Format data for CSV export
      const formattedData = data.map((message) => ({
        ID: message.id,
        Name: message.name,
        Email: message.email,
        Message: message.message,
        Date: new Date(message.timestamp).toLocaleString(),
        Status: message.status,
      }));

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const csv = XLSX.utils.sheet_to_csv(ws);

      // Create a blob and download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = new Date().toISOString().split("T")[0];
      link.setAttribute("download", `Messages - ${date}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Messages exported to CSV!");
    } catch (error) {
      console.error("Error exporting to CSV:", error);
      toast.error("Failed to export to CSV");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Export Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={exportToExcel}
            className="flex cursor-pointer items-center gap-2 focus:bg-green-50 dark:focus:bg-green-950"
          >
            <FileSpreadsheetIcon className="h-4 w-4 text-green-600" />
            <span>Excel (.xlsx)</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={exportToPDF}
            className="flex cursor-pointer items-center gap-2 focus:bg-red-50 dark:focus:bg-red-950"
          >
            <FileTextIcon className="h-4 w-4 text-red-600" />
            <span>PDF Document</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={exportToCSV}
            className="flex cursor-pointer items-center gap-2 focus:bg-blue-50 dark:focus:bg-blue-950"
          >
            <Share2 className="h-4 w-4 text-blue-600" />
            <span>CSV File</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
