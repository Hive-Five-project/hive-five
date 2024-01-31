import Link from '@app/components/Router/Link';
import { route } from '@app/router/generator';
import Login from '@app/pages/Auth/Login';
import AppConfig from '@app/AppConfig.ts';

interface Props {
  title: string
  subtitle: string
  lead: string
  content: string
}

export default function ErrorPageContent({
  title,
  subtitle,
  lead,
  content,
}: Props) {
  return <div>
    <h1>{title}</h1>
    <p>{subtitle}</p>
    <p>{lead}</p>
    <p>{content}</p>
    <ul>
      <li>
        <Link to={route(Login)}>Page d&apos;authentification</Link>
      </li>
      <li>
        <a href={`mailto:${AppConfig.APP_CONTACT_EMAIL}`}>Contactez-nous</a>
      </li>
    </ul>
  </div>;
}
