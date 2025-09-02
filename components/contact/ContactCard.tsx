'use client';

import { Briefcase, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { HTMLAttributes, MouseEvent } from 'react';

import { CURSOR_DATA_HOVER } from '@/constants/cursor';
import { Contact } from '@/models/contacts/Contact';
import { ContactMethod } from '@/models/contacts/ContactMethod';
import { tagContactClick } from '@/utils/tagManager';

import { Card, CardContent } from '../ui/Card';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  contact: Contact;
}

export default function ContactCard(props: Props) {
  const { className, children, contact, ...restProps } = props;

  const getIcon = () => {
    const iconClassName = 'size-5 text-muted';
    switch (contact.name.toLowerCase()) {
      case 'phone':
        return <Phone className={iconClassName} />;
      case 'email':
        return <Mail className={iconClassName} />;
      case 'github':
        return <Github className={iconClassName} />;
      case 'linkedin':
        return <Linkedin className={iconClassName} />;
      case 'portfolio':
        return <Briefcase className={iconClassName} />;
      default:
        return null;
    }
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    tagContactClick(contact.name.toLowerCase() as ContactMethod, {
      url: contact.link,
      target:
        contact.link.startsWith('mailto') || contact.link.startsWith('tel')
          ? '_self'
          : '_blank'
    });
  };

  return (
    <a
      className={className}
      data-hover={CURSOR_DATA_HOVER}
      onClick={onClick}
      rel="noopener noreferrer"
      {...restProps}
    >
      <Card className="bg-background!">
        <CardContent className="text-center">
          <p className="text-lg font-bold text-foreground flex items-center justify-center gap-2">
            {getIcon()}
            {contact.name}
          </p>
          <p className="text-sm text-muted">{contact.linkText}</p>
          {children}
        </CardContent>
      </Card>
    </a>
  );
}
