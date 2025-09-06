"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FileIcon, FileSpreadsheetIcon } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface ExportButtonsProps {
  tableRef: React.RefObject<HTMLTableElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  filename: string;
}

export function ExportButtons({
  tableRef,
  data,
  filename,
}: ExportButtonsProps) {
  const exportToPDF = async () => {
    const input = tableRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${filename}.pdf`);
    toast.success("Exported to PDF successfully!");
  };

  const exportToImage = async () => {
    const input = tableRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: true,
    });
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${filename}.png`);
        toast.success("Exported to Image successfully!");
      }
    }, "image/png");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    toast.success("Exported to Excel successfully!");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        className="hidden md:flex"
        variant="outline"
        onClick={exportToPDF}
      >
        <FileIcon className="mr-2 size-4" /> Export to PDF
      </Button>
      <Button
        className="hidden md:flex"
        variant="outline"
        onClick={exportToImage}
      >
        <DownloadIcon className="mr-2 size-4" /> Export to Image
      </Button>
      <Button
        variant="outline"
        className="hidden md:flex"
        onClick={exportToExcel}
      >
        <FileSpreadsheetIcon className="mr-2 size-4" /> Export to Excel
      </Button>
      <Button
        variant="outline"
        className="flex md:hidden"
        onClick={exportToExcel}
      >
        <DownloadIcon className="size-4" />
      </Button>
    </div>
  );
}
