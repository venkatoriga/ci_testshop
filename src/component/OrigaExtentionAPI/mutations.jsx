import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { gql } from '@apollo/client';


const httpLink = createHttpLink({
  //uri: "http://3.109.71.129:8002/graphql/",
  uri: "https://devextension.origa.market/graphql/",
  //uri:"https://origatest.shop/graphql/"
});


export const secondClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


/* export const GET_SPARE_DETAILS = gql`
query inventoryItem($itemId:String!){
  inventoryItem(itemId: $itemId) {
    message
    code
    response
  }
}
`; */

export const GET_SPARE_DETAILS = gql`
query inventoryItem($groupId: String!, $itemId: String!) {
  inventoryItem(groupId: $groupId, itemId: $itemId) {
    message
    code
    response
  }
}
`;

export const customerMyAmcplans = gql`
  query customerMyAmcplans($ompUserId: String!) {
    customerMyAmcplans(ompUserId: $ompUserId) {
      message
      code
      response
    }
  }
`;


export const customerMyMachinesSold = gql`
query customerMyMachinesSold($ompUserId:String!) {
  customerMyMachinesSold(ompUserId: $ompUserId) {
    message
    code
    response
  }
}
`;

export const schedulevisitCancelList = gql`
mutation updateSchedulevisitcancel($requestinput:ScheduleVisitCancelInput!) {
  updateSchedulevisitcancel(requestinput: $requestinput) {
    message
    success
    response
  }
}
`;

export const Withdraworder = gql`
 mutation updateWithdraworder($requestinput : WithdrawOrderInput!) {
  updateWithdraworder(requestinput: $requestinput) {
    buymachine {
      id
      withdrawOrder
      withdrawReason
      productId
    }
    message
    success
  }
}
`;
export const customerMyMachinesQuery = gql`
    query customerMyMachinesOwned($ompUserId: String!){
        customerMyMachinesOwned(ompUserId: $ompUserId){
            message
            code
            response
        }
    }
`;

export const userID = gql`
    query GetCustomerAddresses {
        me {
            id
            email
            addresses {
                id
                firstName
                lastName
                streetAddress1
                streetAddress2
                city
                postalCode
                country {
                    code
                    country
                }
                phone
            }
        }
    }
`;


export const createBuyschedulevisit = gql`
mutation createBuyschedulevisit($requestinput:ScheduleVisitInput!){
  createBuyschedulevisit(requestinput: $requestinput) {
    buymachine {
      id
      productId
      scheduleVisitDate
      scheduleVisitTime
    }
    response
    message
    success
  }
}

`;

export const CreatePayments = gql`
  mutation CreatePayment($inputpayment: PaymentInput!) {
    createPayment(inputpayment: $inputpayment) {
      payment {
        merchantTransactionId
        id
      }
      message
      success
      responseurl
    }
  }
`;


export const update_machine_Token_amount = gql`
mutation updateBuymachineTokenPayment($inputbuymachine: BuyMachineTokenPayInput!){
  updateBuymachineTokenPayment(inputbuymachine: $inputbuymachine){
    buymachine {
      id
      status
    }
    message
    success
  }
}
`;
export const update_machine_Advance_amount = gql`
mutation UpdateBuyMachineAdvPayment($inputbuymachine: BuyMachineAdvPaymentInput!){
    updateBuymachineAdvPayment(inputbuymachine: $inputbuymachine){
      buymachine {
        id
        status
      }
      message
      success
    }
  }
`;

export const update_machine_FULL_amount = gql`
mutation UpdateBuyMachineFullPayment($inputbuymachine: BuyMachineFullPaymentInput!){
    updateBuymachineFullPayment(inputbuymachine: $inputbuymachine){
      buymachine {
        id
        status
      }
      message
      success
    }
  }
`;

export const BUY_MACHINE_MUTATION = gql`
  mutation BuyMachine($input: BuyMachineInput!) {
    createBuymachine(inputbuymachine: $input) {
      buymachine {
        id
        status
      }
      id
      message
      success
    }
  }
`;

export const Update_Delivery_Address = gql`

mutation updateBuymachineDeliveryaddress($inputbuymachine : BuyMachineDeliveryAddressInput!) {
  updateBuymachineDeliveryaddress(inputbuymachine: $inputbuymachine) {
    buymachine {
      id      
      status
    }
    message
    success
  }
}


`;

export const GET_MACHINE_DETAILS = gql`
query fetchMachineDetailsForBuy($productId:String!,$customerId:String!,$buyMachineId:BigInt!) {
    fetchMachineDetailsForBuy(productId: $productId,customerId:$customerId,buyMachineId:$buyMachineId) {
      message
      code
      response
    }
  }`;


export const CreateAmc = gql`
mutation CreateAmc($amcPlanData: AMCPlanInput!) {
  createAmc(amcPlanData: $amcPlanData) {
    message
    success
    paymenturl
    referenceid
  }
}
`;

export const ServiceArea = gql`
query ServiceArea($pincode: Int!) {
  nearestServicearea(userPincode: $pincode) {
    message
    code
  }
}
`;

export const CreateOtpVerification = gql`
mutation CreateOtpVerification($inputotp: CreateOtpVerificationInput!) {
  createOtpverification(inputotp: $inputotp) {
    otpverification {
      OtpID
      ompMobileNo
      ompUserId
    }
  }
}`;

export const UpdateOTPVerify = gql`
  mutation UpdateOTPVerify($updateOTP : UpdateOtpVerificationInput!){
    updateOtpverification(otpData:$updateOTP)
    {
      message
    }
  }
`;

export const UsersFilterQuery = gql`
query UsersFilter($first: Int, $userMobileno: BigInt) {
  usersFilter(first: $first, userMobileno: $userMobileno) {
    edges {
      node {
        ompUserId
      }
    }
  }
}
`;

export const createUserDetailsMutation = gql`
  mutation CreateUserDetails($inputusers: CreateUserInput!) {
    createUserdetails(inputusers: $inputusers) {
      userdetails {
        ompUserId
        userMobileno
        createdBy
        createdAt
      }
    }
  }
`;


export const updateUserdetails = gql`
mutation updateUserdetails($inputusers : CreateUserInput!){
  updateUserdetails(inputusers: $inputusers) {
    userdetails {
      id
      ompUserId
      firstName
      lastName
      userEmailId
    }
    message
    success
  }
}
`;