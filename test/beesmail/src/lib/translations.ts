import { log, table, time } from "console";

export const translations = {
  en: {
    //homepage
    homepage: {
      bread: "Introducing the Honeycomb protocol",
      title: {
        p1: "Email, ",
        p2: "created",
        p3: " for developers"
      },
      description: "Replace SMTP with direct API calls. Built with Next.js, tRPC, NextAuth and Typescript. Type-safe, ultra-fast, and designed for modern applications.",
        buttons: {
          getStarted: "Get Started Free",
          docs: "Read Documentation",
        },
        toasts: {
          t1: "No credit card required",
          t2: "Open source",
          t3: "Self-hostable",
        },
        why: {
          feautures: "Features",
          q1: "Why BeesMail?",
          description: "A modern approach to messaging that developers actually want to use",
          t1: "Lightning Fast",
          d1: "Direct API calls replace SMTP. No more slow mail queues or delivery delays.",
          t2: "End-to-EndType-Safe",
          d2: "Built with tRPC and Zod. Catch errors at compile time, not runtime.",
          t3: "Secure by Default",
          d3: "Zero-trust and caching mechanisms ensure your messages are always safe.",
          t4: "Optimized for Developers",
          d4: "PostgreSQL with strategic indexing. Query optimization for instant inbox refresh.",
          t5: "Powered by Prisma",
          d5: "Type-safe database access with migrations, introspection, and incredible DX.",
          t6: "tRPC Integration",
          d6: "Seamless RPC call with automatic validation and type safety from frontend to backend.",
        },
        protocol: {
          badge: "Honeycomb Protocol",
          title: "A protocol built for the modern web",
          description: "The Honeycomb Protocol replaces traditional SMTP with direct server-to-server API communication. No more dealing with ancient email standards.",
          feautures: {
            t1: "Type-Safe Schema",
            d1: "Validate messages with Zod before leave your server",
            t2: "Real Time Delivery",
            d2: "Instant message delivery with webhooks and push notifications",
            t3: "Rich Attachments",
            d3: "S3-compatible storage for files with automatic handling"
          },
          button: "Learn About Honeycomb",
          example: "Example: Sending a Message",
          learnMore: "Learn More"
        },
        cta: {
          title: "Ready to modernize you messaging infrastructure?",
          description: "Join developers building the future of email. Get started in minutes, scale to millions",
          button: "Start Building Free",
          button2: "Talk to Sales"
        }
    },
    // Navigation
    nav: {
      product: "Product",
      documentation: "Documentation",
      pricing: "Pricing",
      login: "Login",
      getStarted: "Get Started",
      logout: "Logout",
    },
    // Login Page
    login: {
      title: "BeesMail",
      subtitle: "Sign in to your account on the Honeycomb protocol",
      emailLabel: "Email Address",
      emailPlaceholder: "username:beesmail",
      emailDescription: "Enter your complete email (e.g. username:beesmail or username:custom-domain)",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Forgot password?",
      continueButton: "Continue",
      signInButton: "Sign In",
      signingIn: "Signing in...",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      changeAccount: "Change account",
      errorTitle: "Error",
      invalidCredentials: "Invalid email or password",
      loginError: "An error occurred during login",
    },
    // Register Page
    register: {
      title: "BeesMail",
      subtitle: "Create your account on the Honeycomb protocol",
      emailLabel: "Email Address",
      emailPlaceholder: "username",
      emailSuffix: ":beesmail",
      emailDescription: "Choose your BeesMail email prefix",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      passwordStrength: "Password strength:",
      passwordStrengthWeak: "Weak",
      passwordStrengthMedium: "Medium",
      passwordStrengthStrong: "Strong",
      passwordDescription: "At least 8 characters, with uppercase, lowercase, numbers and symbols",
      confirmPasswordLabel: "Confirm Password",
      acceptTerms: "I accept the",
      termsAndConditions: "terms and conditions",
      createAccountButton: "Create Account",
      creatingAccount: "Creating account...",
      successTitle: "Registration completed!",
      successMessage: "Your account {email} has been created successfully. Redirecting...",
      errorTitle: "Error",
      hasAccount: "Already have an account?",
      signIn: "Sign in",
      // Validation messages
      validation: {
        emailMinLength: "Email prefix must be at least 3 characters.",
        emailMaxLength: "Email prefix cannot exceed 30 characters.",
        emailFormat: "Prefix can only contain letters and numbers.",
        passwordMinLength: "Password must be at least 8 characters.",
        passwordUppercase: "Password must contain at least one uppercase letter.",
        passwordLowercase: "Password must contain at least one lowercase letter.",
        passwordNumber: "Password must contain at least one number.",
        passwordSpecial: "Password must contain at least one special character.",
        passwordMismatch: "Passwords do not match.",
        termsRequired: "You must accept the terms and conditions.",
      },
    },
    // Server-side messages
    server: {
      // Register
      usernameMinLength: "Username must be at least 3 characters",
      usernameMaxLength: "Username cannot exceed 30 characters",
      usernameFormat: "Username can only contain letters and numbers",
      passwordMinLength: "Password must be at least 8 characters",
      passwordUppercase: "Password must contain at least one uppercase letter",
      passwordLowercase: "Password must contain at least one lowercase letter",
      passwordNumber: "Password must contain at least one number",
      passwordSpecial: "Password must contain at least one special character",
      usernameInUse: "This username is already taken",
      emailInUse: "This email is already in use",
      accountCreated: "Account created successfully",
      registrationError: "An error occurred during registration",
      // Login
      emailRequired: "Email is required",
      passwordRequired: "Password is required",
      invalidEmailFormat: "Invalid email format. Use username:domain format",
      invalidUsername: "Invalid username",
      invalidDomain: "Invalid domain",
      invalidCredentials: "Invalid credentials",
      loginSuccess: "Login successful",
      loginError: "An error occurred during login",
    },
    // Auth
    auth: {
      missingCredentials: "Missing credentials",
      invalidCredentials: "Invalid credentials",
    },
        // Footer
    footer: {
      description: "The next-generation email protocol. Fast, secure, and type-safe.",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      security: "Security",
      changelog: "Changelog",
      developers: "Developers",
      documentation: "Documentation",
      apiReference: "API Reference",
      sdks: "SDKs",
      status: "Status",
      company: "Company",
      about: "About",
      blog: "Blog",
      careers: "Careers",
      contact: "Contact",
      copyright: "© 2025 BeesMail. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
    },
    pricing: {
      price: "Pricing",
      title: "BeesMail Plans",
      description: "Start free and scale as you grow. No hidden fees, no surprises.",
      plans:{
          starter: {
              name: "Starter",
              description: "Perfect for trying out BeesMail",
              price: "$0",
              time: "/month",
              feautures: {
                  emails: "Unlimited messages/month",
                  domain: "1 beesmail domain",
                  templates: "Basic templates",
                  api: "API access",
                  support: "Community support",
                  storage: "1GB storage",
              },
              button: "Get Started",
          },
          pro: {
              people: "Most Popular",
              name: "Pro",
              description: "For growing teams and applications",
              price: "$10",
              time: "/month",
              feautures: {
                  emails: "Unlimited messages/month",
                  domain: "1 custom domains",
                  templates: "Advanced templates",
                  api: "Priority API access",
                  support: "Priority support",
                  storage: "10GB storage",
                  logs: "30-day log retention",
                  webhook: "Custom webhooks",
                  dashboard: "Advanced analytics dashboard",
                  verify: "Profile verification badge"
              },
              button: "Upgrade Now",
          },
          enterprise: {
              name: "Enterprise",
              description: "For large-scale operations",
              price: "Custom",
              feautures: {
                  emails: "Unlimited messages/month",
                  domain: "Unlimited domains",
                  infrastracture: "Dedicated infrastructure",
                  support: "24/7 premium support",
                  logs: "Custom log retention",
                  security: "Advanced security features",
                  team: "Unlimited team members",
                  manager: "Dedicated account manager",
                  verify: "Profile verification badge"
              },
              button: "Contact Sales",
          },
          comparison: {
              title: "Compare Feautures",
              table: {
                  feauture: "Feauture",
                  starter: "Starter",
                  pro: "Pro",
                  enterprise: "Enterprise",
              },
              rows: {
                  messages: {
                      title: "Messages per month",
                      starter: "Unlimited",
                      pro: "Unlimited",
                      enterprise: "Unlimited",
                  },
                  domains: {
                      title: "Sending domains",
                      starter: "1 beesmail domain",
                      pro: "1 custom domain",
                      enterprise: "Unlimited domains",
                  },
                  api: {
                      title: "API Access",
                  },
                  webhook: {
                      title: "Custom Webhooks",
                  },
                  analytics: {
                      title: "Analytics Dashboard",
                  },
                  team: {
                      title: "Team Collaboration",
                      enterprise: "Unlimited",
                  },
                  log: {
                      title: "Log Retention",
                      starter: "7 days",
                      pro: "30 days",
                      enterprise: "Custom",
                  },
                  support: {
                      title: "Support",
                      starter: "Community support",
                      pro: "Priority support",
                      enterprise: "24/7 premium support",
                  },
              }
          },
      },
      faq: {
        title: "Frequently Asked Questions",
        questions: {
          q1: {
            question: "What happens if I exceed my plan's limits?",
            answer: "We'll notify you when you reach 80% of your limit. After exceeding, you can upgrade or pay for overage at $0.001 per additional message."
          },
          q2: {
            question: "Can I change plans at any time?",
            answer: "Yes! You can upgrade or downgrade at any time. Changes take effect immediately, and we'll prorate the difference."
          },
          q3: {
            question: "Is there a free trial for paid plans?",
            answer: "Yes, Professional and Enterprise plans include a 7-day free trial. No credit card required to start."
          },
          q4: {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. Invoicing is available for annual subscriptions."
          },
          q5: {
            question: "Can I self-host BeesMail?",
            answer: "Yes! BeesMail is open source. Enterprise customers receive additional support for self-hosted deployments."
          },
        },
        descriptions: {
          title: "Still have questions?",
          answer: "Our team is here to help you find the right plan for your needs.",
          contact: "Contact Sales"
        }
      }
    },
  },
  it: {
    //homepage
    homepage: {
      bread: "Introduzione al protocollo Honeycomb",
      title: {
      p1: "Email, ",
      p2: "creata",
      p3: " per sviluppatori"
      },
      description: "Sostituisci SMTP con chiamate API dirette. Sviluppato con Next.js, tRPC, NextAuth e Typescript. Type-safe, ultra-veloce e progettato per applicazioni moderne.",
      buttons: {
        getStarted: "Inizia",
        docs: "Leggi la documentazione",
      },
      toasts: {
        t1: "Nessuna carta di credito richiesta",
        t2: "Open source",
        t3: "Auto-ospitabile",
      },
      why: {
        feautures: "Funzionalità",
        q1: "Perché BeesMail?",
        description: "Un approccio moderno alla messaggistica che gli sviluppatori vogliono davvero usare",
        t1: "Istantaneo",
        d1: "Le chiamate API dirette sostituiscono SMTP. Niente più code lente o ritardi nella consegna.",
        t2: "Completamente Type-Safe",
        d2: "Costruito con tRPC e Zod. Cattura gli errori in fase di compilazione, non a runtime.",
        t3: "Sicuro per impostazione predefinita",
        d3: "Meccanismi zero-trust e di caching garantiscono che i tuoi messaggi siano sempre al sicuro.",
        t4: "Ottimizzato per gli sviluppatori",
        d4: "PostgreSQL con indicizzazione strategica. Ottimizzazione delle query per aggiornamenti istantanei della casella di posta.",
        t5: "Alimentato da Prisma",
        d5: "Accesso al database type-safe con migrazioni, introspezione e un'esperienza di sviluppo incredibile.",
        t6: "Integrazione tRPC",
        d6: "Chiamate RPC senza soluzione di continuità con validazione automatica e sicurezza dei tipi dal frontend al backend.",
      },
      protocol: {
        badge: "Protocollo Honeycomb",
        title: "Un protocollo costruito per il web moderno",
        description: "Il Protocollo Honeycomb sostituisce l'SMTP tradizionale con una comunicazione API diretta server-to-server. Niente più problemi con standard email obsoleti.",
        feautures: {
        t1: "Schema Type-Safe",
        d1: "Valida i messaggi con Zod prima che lascino il tuo server",
        t2: "Consegna in tempo reale",
        d2: "Consegna istantanea dei messaggi con webhook e notifiche push",
        t3: "Allegati avanzati",
        d3: "Archiviazione compatibile con S3 per file con gestione automatica"
        },
        button: "Scopri di più su Honeycomb",
        example: "Esempio: Invio di un messaggio",
        learnMore: "Per saperne di più"
      },
      cta: {
        title: "Pronto a modernizzare la tua infrastruttura di messaggistica?",
        description: "Unisciti agli sviluppatori che stanno costruendo il futuro dell'email. Inizia in pochi minuti, scala fino a milioni",
        button: "Inizia a messaggiare",
        button2: "Parla con l'assistenza"
      }
    },
    // Navigation
    nav: {
      product: "Prodotto",
      documentation: "Documentazione",
      pricing: "Prezzi",
      login: "Accedi",
      getStarted: "Inizia",
      logout: "Esci",
    },
    // Login Page
    login: {
      title: "BeesMail",
      subtitle: "Accedi al tuo account sul protocollo Honeycomb",
      emailLabel: "Indirizzo Email",
      emailPlaceholder: "username:beesmail",
      emailDescription: "Inserisci la tua email completa (es: username:beesmail o username:dominio-custom)",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Password dimenticata?",
      continueButton: "Continua",
      signInButton: "Accedi",
      signingIn: "Accesso in corso...",
      noAccount: "Non hai un account?",
      signUp: "Registrati",
      changeAccount: "Cambia account",
      errorTitle: "Errore",
      invalidCredentials: "Email o password non corretti",
      loginError: "Si è verificato un errore durante il login",
    },
    // Register Page
    register: {
      title: "BeesMail",
      subtitle: "Crea il tuo account sul protocollo Honeycomb",
      emailLabel: "Indirizzo Email",
      emailPlaceholder: "username",
      emailSuffix: ":beesmail",
      emailDescription: "Scegli il prefisso per la tua email BeesMail",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      passwordStrength: "Complessità password:",
      passwordStrengthWeak: "Debole",
      passwordStrengthMedium: "Medio",
      passwordStrengthStrong: "Forte",
      passwordDescription: "Minimo 8 caratteri, con maiuscole, minuscole, numeri e simboli",
      confirmPasswordLabel: "Conferma Password",
      acceptTerms: "Accetto i",
      termsAndConditions: "termini e le condizioni",
      createAccountButton: "Crea Account",
      creatingAccount: "Creazione account...",
      successTitle: "Registrazione completata!",
      successMessage: "Il tuo account {email} è stato creato con successo. Reindirizzamento in corso...",
      errorTitle: "Errore",
      hasAccount: "Hai già un account?",
      signIn: "Accedi",
      // Validation messages
      validation: {
        emailMinLength: "Il prefisso email deve essere almeno 3 caratteri.",
        emailMaxLength: "Il prefisso email non può superare 30 caratteri.",
        emailFormat: "Il prefisso può contenere solo lettere e numeri.",
        passwordMinLength: "La password deve essere almeno 8 caratteri.",
        passwordUppercase: "La password deve contenere almeno una lettera maiuscola.",
        passwordLowercase: "La password deve contenere almeno una lettera minuscola.",
        passwordNumber: "La password deve contenere almeno un numero.",
        passwordSpecial: "La password deve contenere almeno un carattere speciale.",
        passwordMismatch: "Le password non corrispondono.",
        termsRequired: "Devi accettare i termini e le condizioni.",
      },
    },
    // Server-side messages
    server: {
      // Register
      usernameMinLength: "Lo username deve essere almeno 3 caratteri",
      usernameMaxLength: "Lo username non può superare 30 caratteri",
      usernameFormat: "Lo username può contenere solo lettere e numeri",
      passwordMinLength: "La password deve essere almeno 8 caratteri",
      passwordUppercase: "La password deve contenere almeno una lettera maiuscola",
      passwordLowercase: "La password deve contenere almeno una lettera minuscola",
      passwordNumber: "La password deve contenere almeno un numero",
      passwordSpecial: "La password deve contenere almeno un carattere speciale",
      usernameInUse: "Questo username è già in uso",
      emailInUse: "Questa email è già in uso",
      accountCreated: "Account creato con successo",
      registrationError: "Si è verificato un errore durante la registrazione",
      // Login
      emailRequired: "L'email è obbligatoria",
      passwordRequired: "La password è obbligatoria",
      invalidEmailFormat: "Formato email non valido. Usa il formato username:dominio",
      invalidUsername: "Username non valido",
      invalidDomain: "Dominio non valido",
      invalidCredentials: "Credenziali non valide",
      loginSuccess: "Login effettuato con successo",
      loginError: "Si è verificato un errore durante il login",
    },
    // Auth
    auth: {
      missingCredentials: "Credenziali mancanti",
      invalidCredentials: "Credenziali non valide",
    },
    // Footer
    footer: {
      description: "Il protocollo email di nuova generazione. Veloce, sicuro e type-safe.",
      product: "Prodotto",
      features: "Funzionalità",
      pricing: "Prezzi",
      security: "Sicurezza",
      changelog: "Changelog",
      developers: "Sviluppatori",
      documentation: "Documentazione",
      apiReference: "Riferimento API",
      sdks: "SDK",
      status: "Stato",
      company: "Azienda",
      about: "Chi siamo",
      blog: "Blog",
      careers: "Carriere",
      contact: "Contatti",
      copyright: "© 2025 BeesMail. Tutti i diritti riservati.",
      privacy: "Privacy",
      terms: "Termini",
      cookies: "Cookie",
    },
    pricing: {
      price: "Prezzi",
      title: "Piani BeesMail",
      description: "Inizia gratuitamente e scala con la crescita. Nessun costo nascosto, nessuna sorpresa.",
      plans:{
          starter: {
              name: "Starter",
              description: "Perfetto per provare BeesMail",
              price: "€0",
              time: "/mese",
              feautures: {
                  emails: "Messaggi illimitati/mese",
                  domain: "1 dominio beesmail",
                  templates: "Template di base",
                  api: "Accesso API",
                  support: "Supporto community",
                  storage: "1GB di spazio",
              },
              button: "Inizia",
          },
          pro: {
              people: "Più popolare",
              name: "Pro",
              description: "Per team e applicazioni in crescita",
              price: "€10",
              time: "/mese",
              feautures: {
                  emails: "Messaggi illimitati/mese",
                  domain: "1 dominio personalizzato",
                  templates: "Template avanzati",
                  api: "Accesso API prioritario",
                  support: "Supporto prioritario",
                  storage: "10GB di spazio",
                  logs: "Conservazione log: 30 giorni",
                  webhook: "Webhooks personalizzati",
                  dashboard: "Dashboard analitiche avanzata",
                  verify: "Badge di verifica profilo"
              },
              button: "Aggiorna ora",
          },
          enterprise: {
              name: "Enterprise",
              description: "Per operazioni su larga scala",
              price: "Personalizzato",
              feautures: {
                  emails: "Messaggi illimitati/mese",
                  domain: "Domini illimitati",
                  infrastracture: "Infrastruttura dedicata",
                  support: "Supporto premium 24/7",
                  logs: "Conservazione log personalizzata",
                  security: "Funzionalità di sicurezza avanzate",
                  team: "Membri del team illimitati",
                  manager: "Account manager dedicato",
                  verify: "Badge di verifica profilo"
              },
              button: "Contatta il supporto",
          },
          comparison: {
              title: "Confronta le funzionalità",
              table: {
                  feauture: "Funzionalità",
                  starter: "Starter",
                  pro: "Pro",
                  enterprise: "Enterprise",
              },
              rows: {
                  messages: {
                      title: "Messaggi al mese",
                      starter: "Illimitati",
                      pro: "Illimitati",
                      enterprise: "Illimitati",
                  },
                  domains: {
                      title: "Domini di invio",
                      starter: "1 dominio beesmail",
                      pro: "1 dominio personalizzato",
                      enterprise: "Domini illimitati",
                  },
                  api: {
                      title: "Accesso API",
                  },
                  webhook: {
                      title: "Webhooks personalizzati",
                  },
                  analytics: {
                      title: "Dashboard analitiche",
                  },
                  team: {
                      title: "Collaborazione in team",
                      enterprise: "Illimitati",
                  },
                  log: {
                      title: "Conservazione log",
                      starter: "7 giorni",
                      pro: "30 giorni",
                      enterprise: "Personalizzato",
                  },
                  support: {
                      title: "Supporto",
                      starter: "Supporto community",
                      pro: "Supporto prioritario",
                      enterprise: "Supporto premium 24/7",
                  },
              }
          },
      },
      faq: {
        title: "Domande frequenti",
        questions: {
          q1: {
            question: "Cosa succede se supero i limiti del mio piano?",
            answer: "Ti avviseremo quando raggiungi l'80% del limite. Dopo il superamento, puoi effettuare l'upgrade o pagare l'overage a €0,001 per messaggio aggiuntivo."
          },
          q2: {
            question: "Posso cambiare piano in qualsiasi momento?",
            answer: "Sì! Puoi eseguire upgrade o downgrade in qualsiasi momento. Le modifiche avranno effetto immediato e verrà effettuata la corrispondente fatturazione proporzionata."
          },
          q3: {
            question: "Esiste una prova gratuita per i piani a pagamento?",
            answer: "Sì, i piani Professional ed Enterprise includono una prova gratuita di 7 giorni. Non è richiesta la carta di credito per iniziare."
          },
          q4: {
            question: "Quali metodi di pagamento accettate?",
            answer: "Accettiamo le principali carte di credito, PayPal e bonifici bancari per i piani Enterprise. È disponibile la fatturazione per gli abbonamenti annuali."
          },
          q5: {
            question: "Posso ospitare BeesMail in locale (self-host)?",
            answer: "Sì! BeesMail è open source. I clienti Enterprise ricevono supporto aggiuntivo per le distribuzioni self-hosted."
          },
        },
        descriptions: {
          title: "Hai ancora domande?",
          answer: "Il nostro team è qui per aiutarti a scegliere il piano più adatto alle tue esigenze.",
          contact: "Contatta il commerciale"
        }
      }
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
