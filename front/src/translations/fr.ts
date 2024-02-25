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
    error: 'Une erreur est survenue',
    loading: 'Chargement...',
    actions: {
      cancel: 'Annuler',
      create: 'Créer',
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
      subtitle: 'Erreur 500',
      lead: 'Désolé, le service rencontre un problème, nous travaillons pour le résoudre le plus rapidement possible.',
      content: 'Essayez de rafraîchir la page ou bien réessayez plus tard. Si vous avez besoin d\'une aide immédiate, merci de nous contacter.',
    },
    apiaryList: {
      documentTitle: 'Liste des ruchers',
      addButtonText: 'Ajouter un rucher',
    },
    apiaryForm: {
      create: {
        documentTitle: 'Formulaire de création de rucher',
      },
      update: {
        documentTitle: 'Formulaire de modification de rucher',
      },
      addApiaryName : 'Nom du rucher',
      addApiaryAddress : 'Addresse du rucher',
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
      changePassword: 'Reinitialiser',
      goBack: 'Retour à la page de connexion',
    },
    public: {
    },
    admin: {
    },
    form: {
    },
    components: {
    },
  },
};
