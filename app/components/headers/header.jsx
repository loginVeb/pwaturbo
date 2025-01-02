import React from 'react'
import styles from './header.module.css'

function Header() {
  return (
    <div className={styles.header}>header
     <picture>
     <source media="(min-width: 2560px)" srcSet="/fonHeadrs/zima-extra-large.jpg" />
     <source media="(min-width: 2560px)" srcSet="/fonHeadrs/zima-extra-large.jpg" />
        <source media="(min-width: 1920px)" srcSet="/fonHeadrs/zima-large.jpg" />
        <source media="(min-width: 1600px)" srcSet="/fonHeadrs/zima-widescreen.jpg" />
        <source media="(min-width: 1440px)" srcSet="/fonHeadrs/zima-full-hd.jpg" />
        <source media="(min-width: 1366px)" srcSet="/fonHeadrs/zima-standard.jpg" />
        <source media="(min-width: 1280px)" srcSet="/fonHeadrs/zima-wide.jpg" />
        <source media="(min-width: 1024px)" srcSet="/fonHeadrs/zima-desktop.jpg" />
        <source media="(min-width: 768px)" srcSet="/fonHeadrs/zima-tablet-portrait.jpg" />
        <source media="(min-width: 480px)" srcSet="/fonHeadrs/zima-mobile-portrait.jpg" />
        <source media="(min-width: 320px)" srcSet="/fonHeadrs/zima-extra-small.jpg" />
        <img src="/fonHeadrs/zima-default.jpg" alt="Header image" />
      </picture>
    </div>
  )
}

export default Header