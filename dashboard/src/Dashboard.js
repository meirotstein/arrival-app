import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import { loadData } from './Client';
import { styled } from '@mui/material/styles';

const DashboardContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  textAlign: 'center',
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadData();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContainer>
      {data ? (<Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>{`סה"כ הגיעו: ${data.totalArrived} מתוך ${data.totalExpected}`}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>) : (
        <p>Loading...</p>
      )}
      {/* {data ? (
        <div>
          <h2>Fetched Sheet data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
    </DashboardContainer>
  );
}

export default Dashboard;
