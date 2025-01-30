import { Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Collections = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession(); 

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'authenticated' && session?.accessToken) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get('https://maestro-api-dev.secil.biz/Collection/GetAll', {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`,
            },
          });

          const collections = response.data.data.map((item: any) => ({
            id: item.id,
            baslik: item.info.name,
            urunKosullari: item.filters.filters.map((filter: any) => filter.valueName).join(', '),
            satisKanallari: item.salesChannelId === 1 ? 'Online' : 'Fiziksel Mağaza',
            islemler: 'Düzenle',
          }));

          setData(collections);
        } catch (error) {
          setError('Error fetching data');
          console.error('Error fetching data', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [status, session]);

  return (
    <div>
      <h2>Collections</h2>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Başlık</TableCell>
              <TableCell>Ürün Koşulları</TableCell>
              <TableCell>Satış Kanalları</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.baslik}</TableCell>
                <TableCell>{item.urunKosullari}</TableCell>
                <TableCell>{item.satisKanallari}</TableCell>
                <TableCell>{item.islemler}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Collections;
