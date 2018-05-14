/* eslint-disable */
import {
  observable,
  action
} from "mobx";
import _cookies from 'universal-cookie';
import React from "react";

import gql from 'graphql-tag';
import client from '../../graphql/client';

const Cookies = new _cookies();
export default class CampaignListState {
  @observable campaigns;
  @observable openAddDialog;
  @observable campaignName;
  @observable campaignUrl;
  @observable caller;
  constructor() {
    this.campaigns = [];
    this.openAddDialog = false;
    this.campaignName = '';
    this.campaignUrl = '';
    this.caller = '';
  }

  

  @action fetchCampaigns = () => {
    let self = this;
    const query = gql `
        query {
          feed {
            id name imgUrl
          }
        }
      `;
    client.query({
        query
      })
      .then(data => {
        // data.data.checkUser.username && data.data.checkUser.email_verified ? self.goToStep2() : null;
        self.campaigns = data.data.feed;
        console.log('******* Data: ', self.campaigns.length);
      })
      .catch(err => {
        console.log('Username not found: ', err)
      });
  }

  @action fetchSubs = () => {
    let self = this;
    const subs = gql`
       subscription campaignAdded{
         campaignAdded(where: {
          mutation_in: [CREATED, UPDATED, DELETED]
        }) {
          mutation
          node {
            id
            name
            imgUrl
          }
        }
      }
    `;

    client.subscribe({
      query: subs
    }).subscribe ( {
      next(data) {
        console.log("$$$$$Got it", data);
        self.fetchCampaigns();
      },
      error(err) { console.error('err', err); },
    })
  }

  @action deleteCampaign = (id) => {
    let self = this;
    const mutation = gql `
      mutation deleteCampaign{
          deleteCampaign(id: "${id}") {
              id
          }
      }
    `;
    client.mutate({
        mutation,
        errorPolicy: "all"
      })
      .then(data => {
        // data.data.checkUser.username && data.data.checkUser.email_verified ? self.goToStep2() : null;
        if (data.data) {
          console.log("######## Data Deleted", data.data.id);
        }
      })
      .catch(err => {
        console.log("Could not send invite due to: ", err);
      });
  }

  @action openAddCampaign = () => {
    this.openAddDialog= true;
  }

  @action closeAddCampaign = (action) => {
    if(action === 'Add') {
      this.addNewCampaign();
      this.caller = '';
      console.log("%%%%% Added Campaign");
    }else if(action === 'Update'){
      this.updateExistingCampaign();
      this.caller = '';
      console.log("%%%%% Updated Campaign");
    }else {
      this.campaignName = '';
      this.campaignUrl = '';
      this.caller = '';
      console.log("$$$$$ Not Adding Campaign");
    }

    this.openAddDialog = false;
  }

  @action setCampaignVal = (camName, camUrl) => {
    if(camName){
      this.campaignName = camName;
    }else if(camUrl){
      this.campaignUrl = camUrl;
    }
  }

  addNewCampaign() {
    let self = this;
    const mutation = gql `
      mutation createCampaign{
          createCampaign(name: "${self.campaignName}", imgUrl: "${self.campaignUrl}", isPublished: true) {
              id
          }
      }
    `;
    client.mutate({
        mutation,
        errorPolicy: "all"
      })
      .then(data => {
        // data.data.checkUser.username && data.data.checkUser.email_verified ? self.goToStep2() : null;
        if (data.data) {
          console.log("######## Data Added", data.data.createCampaign.id);
        }
      })
      .catch(err => {
        console.log("Could not send invite due to: ", err);
      });
  }

  updateExistingCampaign() {
    let self = this;
    const mutation = gql `
      mutation updateCampaign{
          updateCampaign(id:"${self.campaignId}", name: "${self.campaignName}", imgUrl: "${self.campaignUrl}", isPublished: true) {
              id
          }
      }
    `;
    client.mutate({
        mutation,
        errorPolicy: "all"
      })
      .then(data => {
        // data.data.checkUser.username && data.data.checkUser.email_verified ? self.goToStep2() : null;
        if (data.data) {
          console.log("######## Data Added", data.data.createCampaign.id);
        }
      })
      .catch(err => {
        console.log("Could not send invite due to: ", err);
      });
  }

  @action openUpdateCampaign = (obj) => {
    this.campaignName = obj.name;
    this.campaignUrl = obj.imgUrl;
    this.campaignId = obj.id;
    this.caller = 'Update';
    this.openAddDialog = true;
  }
}