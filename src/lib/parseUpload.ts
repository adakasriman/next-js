import * as XLSX from "xlsx";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const allowedTypes = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls
  "text/csv", // .csv
];

export async function parseUpload(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return { error: "No file uploaded", status: 400 };
  }

  if (!allowedTypes.includes(file.type)) {
    return { error: "Invalid file type. Please upload .xlsx, .xls, or .csv", status: 400 };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`, status: 400 };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    return { data: jsonData };
  } catch (err) {
    console.error("File parsing error:", err);
    return { error: "Failed to parse file", status: 500 };
  }
}
