import { SECTION_IDS } from '@/constants/sections';
import { CONTACTS } from '@/content/contact';

import ContactCard from '../contact/ContactCard';
import { Card, CardContent } from '../ui/Card';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="py-8 lg:py-16 z-20" id={SECTION_IDS.footer}>
      <Container>
        <Card className="p-8! lg:p-16! card--no-hover">
          <CardContent className="text-center text-foreground space-y-8">
            <h3 className="text-5xl lg:text-7xl font-black font-display">
              Get In Touch
            </h3>
            <p className="text-lg font-bold text-primary">
              Based in Lubbock, TX &middot; Open to the right opportunities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {CONTACTS.map((contact) => (
                <ContactCard key={contact.name} contact={contact} />
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </footer>
  );
}
