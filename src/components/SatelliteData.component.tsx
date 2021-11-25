import { Box, ListItem } from '@mui/material';

interface SatelliteDataProps {
  allData: string[];
}

export default function SatelliteData(props: SatelliteDataProps) {
  return (
    <div style={{width: '80%', float:'right', marginTop: '1%'}}> 
        {Object.entries(props.allData)
        .map( ([key, value]) => 
          <Box
              sx={{
                p: 1,
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' }
              }}
            >
            <ListItem button>
              <div style={{ marginRight: '1%'}}>{key}</div>
              <div style={{ marginLeft: '5%'}}>{value}</div>
            </ListItem>
            </Box>
        )}
    </div>
  );
}

