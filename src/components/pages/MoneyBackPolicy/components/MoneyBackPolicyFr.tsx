/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { COMPANY_ADDRESS } from '@/constants/variables'
import { SUPPORT_LINK } from '@/constants/support-link'

export const MoneyBackPolicyFr = () => {
  return (
    <>
      <p>
        Cette politique de remboursement fait partie intégrante de nos Conditions Générales
        d'Utilisation. Veuillez lire attentivement ces documents, car ils définissent votre relation
        avec nous et contiennent des engagements juridiquement contraignants pour les deux parties.
        Tous les termes commençant par une majuscule et utilisés dans cette politique de
        remboursement, mais non explicitement définis ici, auront la même signification que celle
        donnée dans les Conditions Générales d'Utilisation. <br />
        Nous comprenons que la vie est parfois imprévisible, et qu’il puisse y avoir des moments où
        poursuivre ou commencer un programme proposé par l'application Fit4Me ne soit pas idéal.{' '}
        <br />
        Vous pouvez annuler votre abonnement à tout moment depuis la section « Gérer l’abonnement »
        dans les paramètres de l’application ou en contactant notre service client à l'adresse
        suivante : {SUPPORT_LINK}.
      </p>
      <br />
      <hr />
      <h2>Méthodes de Remboursement des Abonnements</h2>
      <p>
        Les méthodes de remboursement des abonnements varient selon la plateforme sur laquelle vous
        vous êtes abonné à l’application :
      </p>
      <ul>
        <li>
          <strong>Si vous avez souscrit un abonnement via l’App Store :</strong> veuillez suivre les
          étapes décrites{' '}
          <a href="https://support.apple.com/en-us/HT204084" style={{ color: 'var(--green)' }}>
            ici
          </a>{' '}
          pour demander un remboursement.
        </li>
        <li>
          <strong>Si vous avez souscrit un abonnement via le Google Play Store :</strong> veuillez
          suivre les étapes décrites{' '}
          <a
            href="https://support.google.com/googleplay/answer/2479637?hl=en"
            style={{ color: 'var(--green)' }}
          >
            ici
          </a>{' '}
          pour demander un remboursement.
        </li>
        <li>
          <strong>
            Si vous avez souscrit un abonnement via la page web wallpilates.fit4me-life.com :
          </strong>{' '}
          en règle générale, tous les paiements liés aux achats intégrés à l’application sont non
          remboursables, et aucun remboursement ou crédit ne sera accordé pour des périodes
          partiellement utilisées. Toutefois, une exception peut être envisagée si :
          <ul>
            <li>
              <br />- un remboursement pour l’abonnement à l’Application est demandé dans les 30
              jours suivant la date de la transaction, et si vous pouvez démontrer une utilisation
              de l’Application pendant 7 jours consécutifs (voir les détails dans la section «
              Garantie de remboursement » ci-dessous) ;
            </li>
            <li>
              <br />- la législation en vigueur dans votre pays prévoit un droit au remboursement
              (si vous résidez dans l’UE/EEE, veuillez consulter la section « Avis aux résidents de
              l’UE/EEE » ci-dessous).
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <hr />
      <h2>Règles de la Garantie de Remboursement</h2>
      <p>
        En plus des droits au remboursement prévus par la législation applicable, si vous avez
        acheté notre application directement sur l’un de nos sites web et qu’une option de
        remboursement vous a été proposée lors du paiement, vous êtes éligible à un remboursement si
        vous n’avez pas obtenu de résultats visibles avec notre programme, à condition que toutes
        les conditions suivantes soient réunies :
      </p>
      <ul>
        <li>
          <strong>
            Vous nous contactez dans un délai de 30 jours suivant votre achat initial et avant la
            fin de votre période d’abonnement ; et
          </strong>
        </li>
        <li>
          <strong>Vous avez suivi notre programme :</strong>
          <ul>
            <li>
              - pendant au moins 7 jours consécutifs et au cours des 30 premiers jours suivant
              l’achat (pour les abonnements mensuels ou de durée supérieure), ou
            </li>
            <li>
              - pendant au moins 3 jours consécutifs et au cours des 7 premiers jours suivant
              l’achat (pour les abonnements hebdomadaires ou bimensuels) ; et
            </li>
          </ul>
        </li>
        <li>
          <strong>
            Vous êtes en mesure de prouver que vous avez suivi le programme conformément aux
            critères décrits dans la section « Comment démontrer que vous avez suivi le programme ».
          </strong>
        </li>
      </ul>
      <p>
        Pour demander un remboursement, veuillez contacter notre service d’assistance à l’adresse
        suivante : {SUPPORT_LINK}. Nous examinerons votre demande et vous informerons par e-mail de
        sa validation ou de son refus.
      </p>
      <br />
      <hr />
      <h2>Articles Non Remboursables</h2>
      <p>Les éléments suivants ne sont pas éligibles à un remboursement :</p>
      <ul>
        <li>
          <strong>Plans de Repas Personnalisés</strong> – Les plans de repas étant spécifiquement
          conçus selon vos besoins et préférences individuels, ils ne sont pas remboursables une
          fois livrés.
        </li>
        <li>
          <strong>Frais d’Abonnement Récurrents</strong> – Il vous appartient d’annuler votre
          abonnement avant la date de renouvellement afin d’éviter toute facturation supplémentaire.
          Toute demande d’annulation reçue après la date de renouvellement prendra effet à la fin du
          cycle de facturation en cours, et aucun remboursement partiel ne sera accordé.
        </li>
      </ul>
      <br />
      <hr />
      <h2>Comment prouver que vous avez suivi le programme ?</h2>
      <p>
        Vous pouvez démontrer que vous avez suivi le programme en remplissant simplement les
        conditions suivantes :
        <ul>
          <li>
            Fournissez des captures d’écran de l’application attestant du fait que vous avez
            complété :
            <ul>
              <li>
                - au moins 7 séances d'entraînement, de méditation ou autres (pour les abonnements
                mensuels ou de durée supérieure) ; ou
              </li>
              <li>
                - au moins 3 séances d'entraînement, de méditation ou autres (pour les abonnements
                hebdomadaires ou bimensuels).
              </li>
            </ul>
          </li>
        </ul>
      </p>
      <br />
      <hr />
      <h2>Déclaration Importante</h2>
      <p>
        Veuillez noter que seule le respect intégral des conditions énoncées ci-dessus ouvre droit à
        un remboursement au titre de la Garantie de Remboursement. Afin d’éviter toute ambiguïté,
        cette Garantie de Remboursement ne s’applique à aucun autre cas.
      </p>
      <br />
      <hr />
      <h2>Règles Générales de Remboursement</h2>
      <p>
        Nous accordons une grande importance à vos retours et mettons tout en œuvre pour que nos
        clients soient pleinement satisfaits de nos produits et services. Toutefois, si vous estimez
        que notre service ne répond pas à vos attentes, vous pouvez demander un remboursement selon
        les modalités définies dans le présent document.
      </p>
      <p>
        En règle générale, si vous ne remplissez pas les conditions de notre Garantie de
        Remboursement exposées ci-dessus, les sommes versées sont non remboursables et/ou non
        échangeables, sauf indication contraire dans le présent document ou disposition légale
        contraire. Notre société se réserve toutefois le droit d’examiner certaines demandes de
        remboursement au cas par cas et de les accorder à sa seule discrétion.
      </p>
      <p>
        Un remboursement ne peut être sollicité que pendant la période d’abonnement. Si cette
        période a expiré avant que vous ne formuliez votre demande, aucun remboursement ne pourra
        être accordé.
      </p>
      <br />
      <hr />
      <h2>Note à l’attention des résidents de certains États américains</h2>
      <p>
        Si vous résidez en Californie ou dans le Connecticut, vous pouvez annuler votre achat
        jusqu’à minuit du troisième jour ouvrable suivant la date d'achat. Dans ce cas, nous vous
        rembourserons l’intégralité du montant payé.
      </p>
      <br />
      <hr />
      <h2>Note à l’attention des résidents de l'EEE</h2>
      <p>
        Si vous êtes un consommateur résidant dans l’Espace économique européen (EEE) ou en Suisse,
        vous disposez d’un droit légal de rétractation pour tout contrat de prestation de services.
        Toutefois, si vous achetez un contenu numérique à usage unique (comme un enregistrement
        vidéo ou un fichier PDF), vous reconnaissez expressément que ce contenu vous soit mis à
        disposition immédiatement, et vous renoncez de ce fait à votre droit de rétractation,
        rendant caduc votre éligibilité à un remboursement. En revanche, si vous souscrivez à notre
        service sous forme d’abonnement — c’est-à-dire un accès continu à du contenu numérique —
        vous consentez à ce que la prestation débute immédiatement. Dans ce cadre, si vous exercez
        votre droit de rétractation, un montant proportionnel à l’usage du service avant votre
        notification de rétractation sera déduit de votre remboursement.
      </p>
      <br />
      <hr />
      <h2>Exercice du Droit de Rétractation</h2>
      <p>
        Si vous n'avez pas renoncé à votre droit de rétractation, celui-ci est valable pendant 14
        jours à compter de la date de conclusion du contrat. Pour exercer votre droit de
        rétractation, veuillez nous notifier votre décision de manière claire et non équivoque (par
        courrier ou e-mail) à l’adresse suivante : -{' '}
        <strong>
          WhiteApps LTD |{COMPANY_ADDRESS}, email :{SUPPORT_LINK}{' '}
        </strong>
        . Vous pouvez utiliser le formulaire type de rétractation ci-dessous, mais cela n’est pas
        obligatoire. Pour que le délai de rétractation soit respecté, vous devez nous informer de
        votre volonté de vous rétracter avant l'expiration de la période de rétractation.
      </p>
    </>
  )
}
