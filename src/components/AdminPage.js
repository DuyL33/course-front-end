import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { default as React, useEffect } from 'react';

const AdminPage = ({ courses, getCourses }) => {
  const columns = [
    { field: 'cid', headerName: 'ID', width: 70 },
    { field: 'number', headerName: 'Number', width: 130 },
    { field: 'name', headerName: 'Name', width: 400 },
  ];

  // Ensure each course has a unique 'id' for DataGrid
  const coursesWithIds = courses.map((course, index) => ({
    ...course,
    id: course.id?.someUniqueProperty || course.cid || index + 1,
  }));

  // Debug: log courses with proper ids
  useEffect(() => {
    console.log(coursesWithIds);
  }, [coursesWithIds]);

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      Admin page
      <Paper sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={coursesWithIds} // Use coursesWithIds that has unique 'id'
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};

export default AdminPage;
