import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box } from '@material-ui/core';
import CustomMap from './CreateMap';
import DisplayMap from './DisplayMap';


const MapDialog=(props)=> {

  return (
    <div>
      
      <Dialog open={props.open} onClose={props.close} fullWidth maxWidth="md">
            <DialogContent>
                <Box width="100%" height="500px">                          
                    <DisplayMap isMarkerShown location={props.location}
                    />
                </Box>
            </DialogContent>
      </Dialog>
    </div>
  );
  }

export default MapDialog;