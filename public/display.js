// Fetch data from db.json located in the public directory
const fetchData = async () => {
  try {
    const response = await fetch("/db.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data from db.json");
    }
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// Populate the HTML table with the data
const populateTable = (data) => {
  const tableBody = document.getElementById("registrations-body");
  tableBody.innerHTML = ""; // Clear any existing rows

  data.forEach((entry) => {
    const row = document.createElement("tr");

    Object.values(entry).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
};

// Download as CSV
const downloadCSV = () => {
  const table = document.querySelector("#registrations-table");
  const rows = Array.from(table.rows);

  const csvContent = rows
    .map((row) =>
      Array.from(row.cells)
        .map((cell) => `"${cell.textContent}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "registrations.csv";
  link.click();
};

// Download as Excel
const downloadExcel = () => {
  const table = document.querySelector("#registrations-table");
  const worksheet = XLSX.utils.table_to_sheet(table);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

  XLSX.writeFile(workbook, "registrations.xlsx");
};

// Download as PDF
const downloadPDF = () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const table = document.querySelector("#registrations-table");

  const rows = Array.from(table.rows).map((row) =>
    Array.from(row.cells).map((cell) => cell.textContent)
  );

  pdf.autoTable({
    head: [rows[0]], // The first row is the table header
    body: rows.slice(1), // The rest are the table body
  });

  pdf.save("registrations.pdf");
};

// Fetch data on page load
fetchData();
