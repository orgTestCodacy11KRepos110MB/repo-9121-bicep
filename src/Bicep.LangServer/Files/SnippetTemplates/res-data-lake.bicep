﻿// Data Lake Store Account
resource /*${1:dataLakeStore}*/dataLakeStore 'Microsoft.DataLakeStore/accounts@2016-11-01' = {
  name: /*${2:'name'}*/'name'
  location: /*${3:location}*/'location'
  properties: {
    newTier: /*${4|'Consumption','Commitment_1TB','Commitment_10TB','Commitment_100TB','Commitment_500TB','Commitment_1PB','Commitment_5PB'|}*/'Consumption'
    encryptionState: /*${5|'Enabled','Disabled'|}*/'Enabled'
  }
}
