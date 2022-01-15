import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import { Description } from "@mui/icons-material";

/*
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
*/
const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ListUserBooking({id, evento, description}) {
  const [dense, setDense] = useState(false);
  //const [secondary, setSecondary] = useState(false);

  console.log('List userBooking', id, evento, description)

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          </Typography>
          <Demo>
            <List dense={dense}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="chat">
                        <CommentIcon />
                    </IconButton>
                    /*<IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>*/
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary = {evento}
                    secondary={description}
                    //secondary={bookingData.description ? 'Secondary text' : null}
                  />
                </ListItem>,
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}