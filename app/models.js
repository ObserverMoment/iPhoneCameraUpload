const {
  JSORMBase,
  attr,
  belongsTo,
  hasMany,
  hasOne
} = require('jsorm/dist/jsorm');

import { AsyncStorage } from "react-native"

export const ApplicationRecord = JSORMBase.extend({
  static: {
    baseUrl: 'http://localhost:3000',
    apiNamespace: '/api/v2',
    jwtStorage: 'inventure-auth',
    generateAuthHeader(auth) {
      const authObj = JSON.parse(auth);
      return `Bearer ${authObj.token}`
    }
  }
});

export const User = ApplicationRecord.extend({
  static: {
    jsonapiType: 'users'
  },
  attrs: {
    id: attr(),
    name: attr(),
    email: attr(),
    password: attr(),
    currentPassword: attr(),
    venture: belongsTo(),
    duvs: hasMany(),
    comments: hasMany(),
    roles: hasMany(),
    role: belongsTo()
  }
});

export const Role = ApplicationRecord.extend({
  static: {
    jsonapiType: 'roles'
  },
  attrs: {
    name: attr(),
    email: attr(),
    rolableId: attr(),
    rolableType: attr(),
    rolable: belongsTo(),
    user: belongsTo()
  }
});

export const Session = ApplicationRecord.extend({
  static: {
    jsonapiType: 'sessions'
  },
  attrs: {
    email: attr(),
    password: attr(),
    newPassword: attr(),
    token: attr(),
    passwordResetToken: attr(),
    user: belongsTo()
  }
});

export const Reset = ApplicationRecord.extend({
  static: {
    jsonapiType: 'resets'
  },
  attrs: {
    email: attr()
  }
});

export const Partner = ApplicationRecord.extend({
  static: {
    jsonapiType: 'partners'
  },
  attrs: {
    id: attr(),
    createdAt: attr(),
    name: attr(),
    description: attr(),
    hqCity: attr(),
    hqCountry: attr(),
    industryId: attr(),
    roles: hasMany(),
    users: hasMany(),
    innovation: hasOne(),
    industry: belongsTo()
  }
});

export const Innovation = ApplicationRecord.extend({
  static: {
    jsonapiType: 'innovations'
  },
  attrs: {
    createdAt: attr(),
    colour: attr(),
    duration: attr(),
    dvPartner1: attr(),
    dvPartner2: attr(),
    teamGMEmail: attr(),
    id: attr(),
    kickedOffAt: attr(),
    logo: attr(),
    mandate: attr(),
    openDate: attr(),
    sprintName: attr(),
    sprintType: attr(),
    chargeCode: attr(),
    partnerId: attr(),
    dvOfficeId: attr(),
    keyDates: hasMany(),
    concepts: hasMany(),
    dvOffice: belongsTo(),
    partner: belongsTo(),
    region: attr()
  }
});

export const Concept = ApplicationRecord.extend({
  static: {
    jsonapiType: 'concepts'
  },
  attrs: {
    id: attr(),
    createdAt: attr(),
    name: attr(),
    status: attr(), // killed, draft, ready, analysed
    description: attr(),
    comment: attr(),
    logo: attr(),
    logoName: attr(),
    marketFriction: attr(),
    marketSegment: attr(),
    marketSize: attr(),
    targetCustomers: attr(),
    targetGeography: attr(),
    solutionDescription: attr(),
    primaryTechnology: attr(),
    successFactors: attr(),
    keyRisks: attr(),
    businessType: attr(),
    salesChannel: attr(),
    revenueModel: attr(),
    unitEconomics: attr(),
    corporateAdvantage: attr(),
    leveragedAssets: attr(),
    incubationCost: attr(),
    breakEvenCost: attr(),
    breakEvenYear: attr(),
    willGmLeave: attr(),
    gmConviction: attr(),
    gmComments: attr(),
    partnerPreferences: attr(),
    innovationId: attr(),
    targetIndustryId: attr(),
    financeScores: hasMany(), // Each finance score is a single entry of { key, value, description }
    conceptChanges: hasMany(),
    innovation: belongsTo(),
    targetIndustry: belongsTo(),
    canvasesAttachments: hasMany()
  }
});

export const Attachment = ApplicationRecord.extend({
  static: {
    jsonapiType: 'attachments'
  },
  attrs: {
    data: attr(),
    filename: attr(),
    url: attr(),
    name: attr(),
    title: attr(),
    blobId: attr(),
    recordId: attr(),
    recordType: attr(),
    record: belongsTo()
  }
});
