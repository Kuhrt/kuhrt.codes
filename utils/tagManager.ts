'use client';

import { sendGTMEvent } from '@next/third-parties/google';

import { GTAG_EVENTS, GTAG_INTERACTIONS } from '@/constants/tagManager';
import { ContactMethod } from '@/models/contacts/ContactMethod';

export const tagCapabilityClick = (capabilityName: string) => {
  sendGTMEvent({
    event: GTAG_EVENTS.capabilityInteraction,
    capability_name: capabilityName,
    section: 'capabilities',
    interaction_type: GTAG_INTERACTIONS.viewDetails
  });
};

/**
 * Tag a contact click event
 * @note This will handle opening the link if linkOptions are provided. Calling `e.preventDefault` is required before calling this function.
 * @param contactMethod
 * @param linkOptions
 */
export const tagContactClick = (
  contactMethod: ContactMethod,
  linkOptions?: { url: string; target?: '_self' | '_blank' }
) => {
  sendGTMEvent({
    event: GTAG_EVENTS.contactClick,
    contact_method: contactMethod,
    section: 'contact',
    interaction_type: GTAG_INTERACTIONS.contact
  });

  if (linkOptions) {
    setTimeout(() => {
      window.open(linkOptions.url, linkOptions.target ?? '_blank');
    }, 100);
  }
};
