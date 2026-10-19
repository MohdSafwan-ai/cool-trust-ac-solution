export const serviceGuidance: Record<
  string,
  { overview: string; enquiryDetails: string[] }
> = {
  'ac-installation': {
    overview:
      'Planning an AC installation at your home or business? Share the type of unit and the proposed installation location so the team can discuss fitting, access and setup requirements before arranging the work.',
    enquiryDetails: [
      'AC brand, model and whether it is a split or window unit',
      'A photo of the proposed fitting location, if available',
      'Your address and any access restrictions',
    ],
  },
  'ac-repair': {
    overview:
      'Explain what has changed in your AC’s operation, such as reduced cooling, leakage or an unusual sound. These details help the team discuss the inspection needed; the repair scope depends on the fault found.',
    enquiryDetails: [
      'AC brand and model, if known',
      'The symptoms and when you first noticed them',
      'A photo or short description of any displayed error',
    ],
  },
  'ac-gas-filling': {
    overview:
      'A gas filling enquiry includes discussing refrigerant and cooling assessment, leak inspection and any necessary repair. Share the unit details so the team can discuss the appropriate next step for your system.',
    enquiryDetails: [
      'AC brand and model or a photo of its label',
      'The cooling issue you are experiencing',
      'Any known history of leakage or previous refilling',
    ],
  },
  'ac-amc': {
    overview:
      'Discuss an annual maintenance arrangement for the air conditioners at your property. The applicable systems, maintenance scope, visit arrangements and contract terms need to be agreed with the team.',
    enquiryDetails: [
      'Number and type of air conditioners',
      'Your property location and maintenance requirements',
      'Any existing maintenance arrangements or recurring concerns',
    ],
  },
  'ac-maintenance': {
    overview:
      'Routine maintenance enquiries can cover filter cleaning, inspection and servicing needs. Tell the team about the condition of your AC and any concerns you want checked during the service.',
    enquiryDetails: [
      'AC brand, model and number of units',
      'When the unit was last serviced, if known',
      'Any airflow, cooling or leakage concerns',
    ],
  },
  'ac-rental': {
    overview:
      'Tell the team where you need an air conditioner and the intended rental duration. Equipment availability, suitability, installation arrangements and rental terms must be confirmed before a rental can be agreed.',
    enquiryDetails: [
      'Your location and the space you need to cool',
      'Preferred rental duration',
      'Any installation or access requirements',
    ],
  },
  'air-purifier-service': {
    overview:
      'Air purifier servicing requirements depend on the model and the issue reported. Share the appliance details and any filter or operating concerns so the team can discuss whether the requested service can be arranged.',
    enquiryDetails: [
      'Air purifier brand and model',
      'Filter condition or any displayed error',
      'A description of the airflow or operating issue',
    ],
  },
  'refrigerator-repair': {
    overview:
      'Share which part of your refrigerator is not cooling as expected, or describe any unusual operation. The team can discuss an inspection and the repair enquiry based on the appliance and symptoms.',
    enquiryDetails: [
      'Refrigerator brand, model and type',
      'Whether the issue affects the fridge, freezer or both',
      'When the problem started and any displayed error',
    ],
  },
};
