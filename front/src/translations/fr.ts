export default {
  documentTitleSuffix: ' | Hivefive',
  date: {
    /**
     * @see https://github.com/fnando/i18n#date-formatting
     */
    formats: {
      short: '%d/%m/%Y',
    },
  },
  common: {
    loadingDataError: 'Une erreur s\'est produite lors du chargement des données',
    error: 'Une erreur est survenue',
    loading: 'Chargement...',
    actions: {
      cancel: 'Annuler',
      create: 'Créer',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Enregister les modifications',
      send: 'Envoyer',
    },
  },
  pages: {
    notFound: {
      documentTitle: 'Page non trouvée',
      title: 'Page non trouvée',
      subtitle: 'Erreur 404',
      lead: 'La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.',
      content: 'Si vous avez tapé l\'adresse web dans le navigateur, vérifiez qu\'elle est correcte. La page n\'est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d\'accueil. Sinon, contactez-nous pour que l\'on puisse vous rediriger vers la bonne information.',
    },
    forbidden: {
      documentTitle: 'Accès refusé',
      title: 'Vous n\'êtes pas autorisé à effectuer cette action',
      subtitle: 'Erreur 403',
      lead: 'Il semble que vous n\'ayez pas les droits pour accéder à cette ressource ou effectuer cette opération.',
      content: 'Il se peut que votre connexion ait expirée. Essayez de rafraîchir la page et vous reconnecter. Si vous avez besoin d\'une aide immédiate, merci de nous contacter.',
    },
    fatalError: {
      documentTitle: 'Erreur fatale',
      title: 'Une erreur inattendue s\'est produite',
      form: 'Une erreur est survenue lors de la soumission du formulaire.',
      subtitle: 'Erreur 500',
      lead: 'Désolé, le service rencontre un problème, nous travaillons pour le résoudre le plus rapidement possible.',
      content: 'Essayez de rafraîchir la page ou bien réessayez plus tard. Si vous avez besoin d\'une aide immédiate, merci de nous contacter.',
    },
    apiaryList: {
      documentTitle: 'Liste des ruchers',
      addButtonText: 'Ajouter un rucher',
    },
    apiaryHome: {
      documentTitle: 'Page du rucher',
      addButtonText: 'Ajouter une ruche',
      name: 'Nom du rucher :',
      address: 'Adresse :',
      createdAt: 'Créé le :',
      updatedAt: 'Mis à jour le :',
    },
    apiaryForm: {
      create: {
        documentTitle: 'Formulaire de création de rucher',
        buttonSubmit: 'Créer un rucher',
        errorSubmit: 'Une erreur est survenue lors de la création du rucher.',
      },
      update: {
        documentTitle: 'Formulaire de modification de rucher',
        buttonSubmit: 'Modifier un rucher',
        errorSubmit: 'Une erreur est survenue lors de la modification du rucher.',
      },
      addApiaryName : 'Nom du rucher',
      addApiaryAddress : 'Addresse du rucher',
    },
    profileForm: {
      update: {
        documentTitle: 'Formulaire de modification du profile',
      },
    },
    beehiveHome: {
      documentTitle: 'Page de la ruche',
      name: 'Nom de la ruche :',
      bees: 'Type d\'abeilles :',
      age: 'Age de la reine :',
      createdAt: 'Créé le :',
      updatedAt: 'Mis à jour le :',
    },
    beehiveForm: {
      create: {
        documentTitle: 'Ajouter une ruche',
        buttonSubmit: 'Ajouter la ruche',
        errorSubmit: 'Une erreur est survenue lors de la création de la ruche.',
      },
      update: {
        documentTitle: 'Modifier une ruche',
        buttonSubmit: 'Modifier la ruche',
        errorSubmit: 'Une erreur est survenue lors de la modification de la ruche.',
      },
      beehiveName : 'Nom de la ruche',
      beesType : 'Type d\'abeilles',
      queenAge:'Age de la reine',
      updatedAt:'Date du dernier essaimage',
    },
    login: {
      documentTitle: 'Identification',
      authenticationFailed: 'L\'authentification a échoué.',
      inputEmail: 'Adresse email',
      inputPassword: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      noAccount: 'Pas de compte ?',
      askAccount: 'Demander-en un',
      connect: 'Se connecter',
    },
    logout: {
      documentTitle: 'Déconnexion',
      disconnect: 'Se déconnecter',
    },
    forgotPassword: {
      documentTitle: 'Mot de passe oublié',
      goBack: 'Retour à la page de connexion',
      content: "Saisissez votre adresse e-mail. Si elle est lié à un compte Hive Five, vous recevrez un lien de vérification afin de réinitialiser votre mot de passe.",
    },
    forgotPasswordConfirmation: {
      documentTitle: 'Lien de vérification',
      title: 'Un lien de vérification vous a été envoyé',
      content: 'Consultez votre boite mail pour accéder au lien de vérification.',
      noEmail: 'Vous n\'avez pas reçu de mail ?',
      resendEmail: 'Renvoyer',
      goBack: 'Retour à la page de connexion',
    },
    resetPassword: {
      documentTitle: 'Réinitialiser votre mot de passe',
      newPassword: 'Nouveau mot de passe',
      newPasswordConfirm: 'Confirmer le mot de passe',
      changePassword: 'Réinitialiser',
      goBack: 'Retour à la page de connexion',
    },
    user: {
      profile: {
        documentTitle: 'Mon profil',
      },
    },
    public: {
    },
    admin: {
      user: {
        list: {
          documentTitle: 'Liste des utilisateurs',
          table: {
            header: {
              uid: 'UID',
              email: 'Adresse email',
              firstname: 'Prénom',
              lastname: 'Nom',
              createdAt: 'Créé le',
              updatedAt: 'Modifié le',
              deletedAt: 'Supprimé le',
              isAdmin: 'Administrateur',
              actions: 'Actions',
            },
            action: {
              button: 'Actions',
              delete: 'Supprimer',
              update: 'Modifier',
            },
          },
          return: 'Retour à la liste des utilisateurs',
        },
        create: {
          documentTitle: 'Ajout d\'un utilisateur',
          button: 'Créer un nouvel utilisateur',
        },
        update: {
          documentTitle: 'Modification d\'un utilisateur',
        },
        form: {
          email: 'Adresse email',
          firstname: 'Prénom',
          lastname: 'Nom',
          isAdmin: 'Administrateur',
          successCreate: 'Utilisateur créé avec succès.',
          successUpdate: 'Utilisateur modifié avec succès.',
          successDelete: 'Utilisateur supprimé avec succès.',
          warning: 'Attention, vous êtes sur le point de supprimer cet utilisateur :',
        },
      },
    },
    form: {
    },
    components: {
    },
    profile: {
      documentTitle: 'Profil',
      emailLabel: 'Email:',
      error: 'Une erreur est survenue lors de la soumission du formulaire.',
      successMessage: 'Profil modifié avec succès.',
      updateProfile: 'Modifier le profil',
    },
  },
};
