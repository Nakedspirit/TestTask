import { List, ListItem } from '@mui/material';

interface SatelliteListProps {
    satelliteList: any[];
    getData: (satelliteId: string) => void
}

export default function SatelliteList(props: SatelliteListProps) {
  return (
    <div style={{width: '20%', float:'left', marginTop: '1%'}}>
      <List component="nav" aria-label="main mailbox folders">
      {props.satelliteList.map((item) => (
        <ListItem button 
            onClick={() => {props.getData(item); }}>
            {item}
        </ListItem>
      ))}
      </ List>
    </div>
  );
}