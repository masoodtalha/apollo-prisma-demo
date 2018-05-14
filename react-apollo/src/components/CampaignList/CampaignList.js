/* eslint-disable */
import React, {
  Component
} from 'react';
import {
  inject,
  observer
} from 'mobx-react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


import '../style.css';

@inject("store")
@observer
export default class CampaignList extends Component {
  constructor(props) {
    super(props);
    this.state = props.store.campaignListState;
    // this.state.campaignsList = this.state.campaigns.splice(0);
    this.state.fetchCampaigns();
    this.state.fetchSubs();
    console.log("list: ",this.state.campaigns.length);
  }

  addCampaignDialog() {
    return (
      <Dialog
          open={this.state.openAddDialog}
          onClose={this.state.handleClose}
          aria-labelledby="add-campaign-dialog"
        >
        <DialogTitle id="form-dialog-title">Add Campaign</DialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name of Campaign"
              value={this.state.campaignName}
              onChange={(event)=>this.state.setCampaignVal(event.target.value, false)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              label="Image Url"
              value={this.state.campaignUrl}
              onChange={(event)=>this.state.setCampaignVal(false, event.target.value)}
              fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>this.state.closeAddCampaign(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>this.state.closeAddCampaign(this.state.caller ? 'Update': 'Add')} color="primary">
              {this.state.caller? 'Update': 'Add'}
            </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    return(
      <div>
        <div className = "bg"> </div>
        <Typography align='center' variant="display3" color='primary' gutterBottom>
          Campaigns
        </Typography>
        <Button color="primary" aria-label="add" className="addCampaign" onClick={this.state.openAddCampaign}>
          <AddIcon /> <span style={{position:'relative', top:'2px'}}>Add Campaign</span>
        </Button>

        {this.addCampaignDialog()}
        <Grid container className="root">
          <Grid item xs={12}>
            <Grid container className="demo" justify="center" spacing={16}>
              {this.state.campaigns.map((value,index) => (
              <Grid key={index} item xs={3}>
                <Paper className="paper">
                  <img src={value.imgUrl} width="250" height="200"/>
                  <Typography align='center' variant="title" color='secondary' className="campaignTitle">
                    {value.name}
                  </Typography>
                  <Button color="primary" align="center" aria-label="add" className="updateBtn" onClick={()=>this.state.openUpdateCampaign(value)}>
                    Update
                  </Button>
                  <Button color="secondary" align="center" aria-label="add" className="deleteBtn" onClick={()=>this.state.deleteCampaign(value.id)}>
                    Delete
                  </Button>
                </Paper>
              </Grid>
               ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}