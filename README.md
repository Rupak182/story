# Oveview

 This website lets you to create your own story.



# Requirements of webstie
- Need a metamask wallet for completing the sign in process to view stories.
- A recent browser.

## How to use

- Visit [Story Website.](https://story-dusky.vercel.app/)
- Before creating you story you need to sign in 

- In the sign in page first you need to connect to your metamask wallet and then fill your sigin details to be able to sign in.

- A new user has to folllow the similar steps but has to go to sigup page to get registered.

- After you signin- you can create a post by clicking on start creating button on homepage

- You can view and delete all the stories in the posts page if you are registered.




## Tech


- [Next.js](https://nextjs.org/) -A framework based on React.
- [Nextauth.js](https://next-auth.js.org/) - For implementing authentication.
- [shadcn](https://ui.shadcn.com/) -For UI components
- [prisma](https://www.prisma.io/)- An ORM for database queries,
- Logo and Images from [logoipsum](https://logoipsum.com/) and [pollinations](https://pollinations.ai/)


## Installation


Install the dependencies and devDependencies:
```sh
Clone the github repo.
run npm install
```

ENV settings:
Create a .env file in root directory
```sh
DATABASE_URL=[Add your database url]
AUTH_SECRET=[] # Generated  by using npx auth copy the secret from .env.local to .env in root folder
```

Prisma optional settings:
```sh
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // you can use other provider also based on compatibility.Refer prisma docs.
  url      = env("DATABASE_URL")
}

```

Final step:

- Add .env to .gitignore




