import React from 'react'
import "./Social.scss";
import Icon from '../Icon';

interface SocialNetworkInterface {
  name: string;
  link: string;
  icon: string;
}

const Social = () => {
  const socialNetworks: SocialNetworkInterface[] = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/ritmosp.chevrolet",
      icon: "facebook"
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/ritmobr/",
      icon: "instagram"
    },
  ]
  return (
    <ul className="c-social">
      {socialNetworks.map(social => (
        <li key={social.name}>
          <a href={social.link} target="_blank" rel="nofollow" title={social.name}>
            <Icon size="20" icon={social.icon} />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Social