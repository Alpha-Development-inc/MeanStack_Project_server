import React, { Component } from 'react';
import { FacebookProvider, Group } from 'react-facebook';
 
export default class TweetList extends Component {
  render() {
    return (
      <FacebookProvider appId="470755350743457">
        <Group
          href="https://www.facebook.com/groups/1137699903050458"
          width="300"
          showSocialContext={true}
          showMetaData={true}
          skin="light"
        />
      </FacebookProvider>
      
    );
  }
}