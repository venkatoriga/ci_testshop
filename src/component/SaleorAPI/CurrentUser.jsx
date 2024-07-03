
import { gql } from '@apollo/client';


export const CurrentUser = gql`
query CurrentUser {
  me {
    id
    lastLogin
    dateJoined
    email
    firstName
    lastName
    defaultBillingAddress {
      firstName
      lastName
      isDefaultBillingAddress
      isDefaultShippingAddress
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      countryArea
      postalCode
      phone
      country {
        country
        code
      }

    }
    defaultShippingAddress {
      firstName
      lastName
      isDefaultBillingAddress
      isDefaultShippingAddress
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      countryArea
      postalCode
      phone
      country {
        country
        code
      }
    }
    addresses {
      firstName
      lastName
      isDefaultBillingAddress
      isDefaultShippingAddress
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      countryArea
      postalCode
      phone
      country {
        country
        code
      }
    }
    avatar {
      url
      alt
    }
    metadata{
      key
      value
    }
    
    orders {
      totalCount
    }
  }
}`;

