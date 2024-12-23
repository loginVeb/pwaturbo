
import styles from "./page.module.css";
import ClientPwa from "./components/pwa/clientPwa";
import Table from './components/table';

export default function Home() {
  return (
    <div className={styles.mainPageDiv}>
     <ClientPwa styles={styles} />
     <Table styles={styles} />
 </div>
  );
}
// contr+shift+p settings настройки
// shift+alt+t перевод выделеной строки на русский
//contr+1 скриншот
// OneDrive/'Рабочий стол'/
// create screenshots for application from image
// rm -rf .next
// rm -rf node_modules
// npm run dev --pwa
// git add ./
// git commit -am '
//  git push
// git pull 
// vercel --prod
// git log
// git stash
// git checkout commitProject
// git branch 
// git push -f origin HEAD~1:main
// npm run build
// Удолить локально коммит
// git reset HEAD~

//Создать новую ветку и автоматически слить текущую ветку
// git switch --create <name>
//Удолить локальную ветку
//git branch -D name
//Чтобы удалить ветку из удаленного репозитория, 
 //git push origin --delete nameBranch
 
// npx prisma
// npx prisma init
// npx prisma db pull
// mkdir -p prisma/migrations/0_init
// npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
// npx prisma migrate resolve --applied 0_init~

// DATABASE_URL="mysql://auth_headingair:f585811040d0fb4be63060299bf6db5c4b37fb1d@z8z.h.filess.io:3306/auth_headingair"
// # DATABASE_URL="mysql://root:root@localhost:3306/auth"


// npx prisma studio

// Используйте строку поиска внизу, чтобы задать вопросы.
//  Phind автоматически попытается использовать вашу кодовую базу для ответа. 
//  Введите @, чтобы указать файлы/код в вашем запросе.
//   Введите @web_search, чтобы выполнить поиск в Интернете.
//    Включите автозаполнение: Cmd+Shift+P 
//    Включить автодополнение с помощью Phind 
//     Ctrl/Cmd + I, чтобы начать новый чат с вашим текущим выбором
//   Ctrl/Cmd + Shift + I с выбранным кодом, чтобы добавить его в существующий чат. 
//   Ctrl/Cmd + Shift + M с выбранным кодом, чтобы переписать выбор на основе ваших инструкций.
//    Ctrl + Enter, чтобы выполнить поиск с использованием всей вашей кодовой базы.
//     Ctrl/Cmd + Shift + L, чтобы спросить phind о вашей последней команде/выводе. 
//     Используйте Alt/Option + Enter, чтобы выполнить поиск без добавления контекста.
//      Используйте Ctrl/Cmd + Shift + J, чтобы просто открыть/закрыть панель phind.