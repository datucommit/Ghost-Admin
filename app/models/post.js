import Ember from 'ember';
import Model, {attr, belongsTo, hasMany} from '@ember-data/model';
import ValidationEngine from 'ghost-admin/mixins/validation-engine';
import boundOneWay from 'ghost-admin/utils/bound-one-way';
import moment from 'moment';
import {compare} from '@ember/utils';
// eslint-disable-next-line ghost/ember/no-observers
import {computed, observer} from '@ember/object';
import {equal, filterBy, reads} from '@ember/object/computed';
import {isBlank} from '@ember/utils';
import {on} from '@ember/object/evented';
import {inject as service} from '@ember/service';

const sidebars = {montana: '<span>Montana Reverse Phone Lookup</span><p>Reverse phone lookup, or reverse phone search, is used to uncover information that can identify an unknown caller. Reverse phone search tools search a variety of public records and phone number registration databases to ascertain subscribers assigned numbers submitted for search. It is useful for answering the question: &quot;who called me&quot;.<p>', florida: '<span>Florida Reverse Phone Lookup</span><p>Reverse phone lookup (also reverse phone search) involves finding the personal details connected to a particular phone number. Some of these details include the name and address of the caller. Reverse phone lookup is enabled by the documentation provided when registering a phone number. It is useful for identifying callers and staying ahead of phone scams and stalkers.<p>', alaska: '<span>Alaska Reverse Phone Lookup</span><p>Performing reverse phone lookup on Alaska phone numbers allows one to identify unknown callers. There are many reasons why someone may decide to investigate the origin of a phone call. While it can be out of curiosity, it may also be to find out if an unknown number belongs to a stalker, a scammer, or someone with a criminal record. Understanding how to search the extensive databases maintained by reverse phone search services can help you decide whether you should ignore an unknown caller or call them back.<p>', nebraska: '<span>Nebraska Reverse Phone Lookup</span><p>Reverse phone lookup or reverse phone search is a way of finding the identities of callers not in your contact lists through their phone numbers. This service is useful for discovering the owners of unknown numbers calling you whether the numbers bear Nebraska area codes or not. The information provided can help you decide whether an unsolicited call is likely from a scammer, an old acquaintance, a known organization, a robocaller, or a spam caller.\n<p>', nevada: '<span>Nevada Reverse Phone Lookup</span><p>Also known as reverse phone search, phone number lookup refers to the different ways a called party can find out the real person behind an unknown call just by searching with the phone number. Vital personal information required as a basic registration requirement for obtaining a phone number provides a rich database for reverse phone search. Using phone lookup services, Nevada residents can identify unknown callers and avoid scammers trying to steal money and information.\n<p>', newjersey: '<span>New Jersey Reverse Phone Lookup</span><p>Reverse phone search or phone number lookup is the process for obtaining information about the registered user of a telephone service number. Before any individual is granted a phone number, they are required to provide personal information details for verification and other statutory purposes. By performing a reverse phone search using a phone number, it is possible to identify who the number is registered to.\n<p>', newyork: '<span>New York Reverse Phone Lookup</span><p>A reverse phone number search or phone number lookup involves searching and identifying the subscriber registered to a phone number. The most common reason to conduct a phone number search is to discover details about the person using a particular phone number, most often on suspicion of fraud or other illicit activities. You can also look up an unknown phone number or a spam call in order to discover the identity of a strange caller.<p>', connecticut: '<span>Connecticut Reverse Phone Lookup</span><p>Reverse phone lookup is the process of discovering more details about who a phone number is registered to using just the phone number. Using a standard phone directory, you find a phone number by searching by name. In reverse phone search, however, it is the phone number that will lead the enquirer to the name and other details about who the number is registered to.<p>', indiana: '<span>Indiana Reverse Phone Lookup</span><p>Phone lookup or reverse phone search is a way of discovering the owner of a phone number by searching phone subscriber directories. With the increasing worry of phone scams, many Hoosiers are uneasy when contacted by unknown numbers. Identifying an unknown caller is just one of the many reasons why someone may consider investigating the origin and location of a call. Phone lookup services maintain extensive databases of mobile phone, landline, and some VoIP phone numbers. Anyone can easily use these online tools to differentiate genuine callers from spam.\n<p>', kansas: '<span>Kansas Reverse Phone Lookup</span><p>The processes of searching and retrieving user information for phone numbers is referred to as reverse phone lookup. It is a procedure used to discover who an unknown number is registered to. During the process of procuring a phone line, carriers require each subscriber to provide identification and contact information. Reverse phone searches look up these details and return them to persons trying to identify persons registered to submitted phone numbers. A reverse phone lookup is also known as reverse phone search or phone number lookup.<p>', louisiana: '<span>Louisiana Reverse Phone Lookup</span><p>A reverse phone search refers to the process involved in looking up information about a phone number to identify whom the number is registered to. Before receiving a phone number, subscribers are required to complete paperwork and provide identification, and this information is registered in a directory. A reverse phone search or phone number lookup searches the directory and retrieves available information about the registrant of a phone number.<p>', maryland: '<span>Maryland Reverse Phone Lookup</span><p>Reverse phone lookup is a process by which an individual can discover who the phone number that called them is registered to, amongst other information. This process is also referred to as phone number search. When acquiring a phone number, each subscriber is required to complete paperwork that will contain personal information details. A reverse phone lookup accesses carrier subscriber registries to retrieve available information about the phone numbers being searched.<p>', michigan: '<span>Michigan Reverse Phone Lookup</span><p>A reverse phone lookup is a process by which available information about the owner of a phone number is obtained. Anyone who applies for a phone number is required to provide their identity and contact data before receiving one. This information is stored in a user account directory maintained by the service provider. The question &quot;who called me?&quot; can be answered by retrieving the user information for the phone number in question with a reverse phone search.<p>', minnesota: '<span>Minnesota Reverse Phone Lookup</span><p>Reverse phone lookup is the process of getting the names and other personal information of unknown callers using their phone numbers. There are many reasons why Minnesotans may decide to perform reverse phone searches. While some may want to find out whether anonymous numbers calling them are from scammers or stalkers, others may do so to find more information on vaguely familiar contacts. Regardless of their reasons, searching extensive directories maintained by phone number lookup services can provide information about who those numbers are registered to.<p>', mississippi: '<span>Mississippi Reverse Phone Lookup</span><p>Reverse phone lookup or reverse phone search involves retrieving user account information for a phone number. When purchasing a phone line, the subscriber is required to provide certain personal information as well as identification. Carriers keep such subscriber information in user account directories that reverse phone searches can query. A reverse phone search or phone number search is for verifying who an unknown number is registered to.<p>', northcarolina: '<span>North Carolina Reverse Phone Lookup</span><p>The process by which a person can obtain information about who the phone number that called them is registered to is referred to as reverse phone search or phone number lookup. Anyone who acquires a phone number is required to provide personal information about themselves, which is registered against the number. By performing a reverse phone lookup, it is possible to gain access to the subscriber details registered to a phone number.<p>', northdakota: '<span>North Dakota Reverse Phone Lookup</span><p>Reverse phone lookup is the process of retrieving available user account information about a phone number. Also commonly referred to as phone number lookup, it provides answers to the question &quot;who is this number registered to&quot;. Part of the steps required for obtaining a new phone number is submitting personal information and providing ID to your carrier of choice. Carriers store such subscriber records in accessible user account directories. A reverse phone lookup queries these directories and returns the available information to the persons conducting the phone number lookup.<p>', ohio: '<span>Ohio Reverse Phone Lookup</span><p>When an individual performs a reverse phone search or a phone number lookup, it is usually to find out information about the person who owns a particular phone number. This is possible because people are required to provide identifying information when requesting phone numbers. As such, discovering details about the last person who called you is simple as long as you can retrieve the phone number they called you with.<p>', oregon: '<span>Oregon Reverse Phone Lookup</span><p>Reverse phone search, or phone number lookup, is an investigative process through which an individual retrieves information about a caller or user of a specific phone number. It comes in handy when there are doubts about the true identity of a caller. By inputting the phone number in a reverse phone lookup search, information about the subscriber assigned the number can be accessed. This is possible because subscriber details are provided to carriers when registering new phone numbers.<p>', pennsylvania: '<span>Pennsylvania Reverse Phone Lookup</span><p>Reverse phone lookup or reverse phone search is a directory that contains phone numbers and details about who the numbers are registered to. The main difference between this and a regular directory is that the phone number is used to get other information about the customer rather than using previously known information to get the phone number. There are many reasons to undertake a reverse phone search. Some of these include identifying unknown callers, stopping spam calls, and avoiding phone scams. In addition to identifying a caller, a reverse phone lookup may also provide other information about the caller including their address and criminal record. While a quick Google search may reveal phonebook information about a phone number, dedicated reverse phone lookup services offer more thorough searches, can find information on a wider range of numbers, and provide deeper information about callers.<p>', rhodeisland: '<span>Rhode Island Reverse Phone Lookup</span><p>Reverse phone search, also known as phone number lookup, is the process of unveiling detailed information about the subscriber registered to a phone number. It is called &#39;reverse&#39; because instead of using a name to get the phone number, the phone number is used to get the person&#39;s name and other details.<p>', southcarolina: '<span>South Carolina Reverse Phone Lookup</span><p>It is possible to identify the unknown of an unknown number by conducting a reverse phone lookup. Reverse phone lookup services run submitted numbers through their extensive databases of phone subscribers to identify unknown callers. These services are needed when you want to find out if unknown callers with phone numbers bearing South Carolina area codes are fraudsters, stalkers, old friends, or someone you would rather engage or ignore.\n<p>', southdakota: '<span>South Dakota Reverse Phone Lookup</span><p>Reverse phone lookup is the process of looking up available details about the registered user of a phone number. When registering new phone subscribers, carriers collect their contact information and store these details in accessible directories. A reverse phone lookup service searches these directories and retrieves user information on the subjects of the searches. When a user submits a number to a phone look service, they want an answer to the question &quot;who is this number registered to?&quot;<p>', tennessee: '<span>Tennessee Reverse Phone Lookup</span><p>Reverse phone lookup or reverse phone search is a way of finding out the true identities of unknown callers through their phone numbers. Various phone lookup services maintain extensive directories that can provide information associated with phone numbers registered in the United States. Available information can include names, addresses, and even criminal records. Understanding how to search through these online-based phone databases can help Tennesseans determine whether or not to answer a call or redial it.<p>', utah: '<span>Utah Reverse Phone Lookup</span><p>Reverse phone lookup is a way of retrieving a name and other personal information associated with a phone number. Some online directories maintain extensive databases useful for discovering the identities and addresses of unknown callers and other available information Understanding how to use these services can help determine whether to ignore a call from an unknown, dial back, block it, or report it to your local law enforcement.<p>', virginia: '<span>Virginia Reverse Phone Lookup</span><p>Reverse phone lookup or reverse phone search is the process of using a phone number to identify the caller details associated with it. It is not always advisable for Virginians to answer unknown calls without first running an online reverse check on the numbers calling them. While it could be a friend, family, or acquaintance, an unknown number could also be a scammer, robocall, or malicious person. Phone lookup services maintain comprehensive collections of landline and cellphone numbers and can provide the customer details attached to them. The search results will help you decide whether you want to call back, ignore, or block future calls from that number.<p>', westvirginia: '<span>West Virginia Reverse Phone Lookup</span><p>A phone lookup, or reverse phone search, is the act of querying a reverse phone directory to retrieve details about a particular phone number. Individuals or companies that apply for phone numbers are mandated to provide essential information such as full names and addresses. As such, anyone who receives a call from an unknown number can use reverse phone lookup to answer the question &quot;who called me?&quot;<p>', wyoming: '<span>Wyoming Reverse Phone Lookup</span><p>Reverse phone lookup is the process of searching and retrieving information about the person registered to an unknown number. Persons procuring new phone numbers provide identification and other personal details before receiving their new numbers. This information is stored in user account directories retained by the service provider. Reverse phone lookup or phone number search services query carrier user directories and return information on the numbers submitted for searching. A reverse phone search is useful for answering the question &quot;who called me?&quot; when you receive a call from an unknown number.<p>', california: '<span>California Reverse Phone Lookup</span><p>Reverse phone search is a phone-based information retrieval technique that involves finding information about an individual or business from their phone numbers. These phone lookup services check their databases for phone number registration histories such as name, address, and other related information. Learning this information can help recipients determine whether to answer or call back a number or not.<p>', newhampshire: '<span>New Hampshire Reverse Phone Lookup</span><p>Reverse phone lookup is the process of searching a phone number to discover more details about the owner of the number. Using a reverse phone search to find information on the owner of any telephone number is possible because important data on the owner is collected and stored in the carrier&#39;s database before it is assigned and activated. Such carrier databases are consulted when residents of New Hampshire carry out reverse phone searches to identify unknown callers.\n<p>', newmexico: '<span>New Mexico Reverse Phone Lookup</span><p>Reverse phone search or phone lookup is the process of searching a phone number in online directories to identify the owner. Some online web pages maintain unique search engines that allow users to know more about the owners of unknown phone numbers calling them. Using the information provided, researchers may then decide whether to ring back the caller or simply ignore their call.<p>', oklahoma: '<span>Oklahoma Reverse Phone Lookup</span><p>Reverse phone lookup involves identifying an unknown caller by their phone number. Carrier directories and other databases of subscriber information make reverse phone searches possible. When registering new phone numbers, carriers collect identifying information from new subscribers. When searching an Oklahoma phone number using a lookup tool, the reverse phone lookup service consults the databases of all major carriers operating in the state. Identifying unknown callers can help Oklahoma residents avoid phone scams, spam calls, and robocalls.<p>', texas: '<span>Texas Reverse Phone Lookup</span><p>Reverse phone search, or phone number lookup, refers to the process in which an individual can discover more about the person behind a phone number. Because paperwork and other information is required to be provided when being granted a phone number, it is possible to learn more about the individual calling you simply by using the phone number they used to call. <p>', vermont: '<span>Vermont Reverse Phone Lookup</span><p>Reverse phone lookup, or reverse phone search, allows you to find out who owns unknown numbers calling you. These searches are essential everytime you receive unknown phone calls from mobile, landline, or VoIP numbers bearing Vermont area codes. Performing reverse phone search sheds more light on whether a caller is a scammer, an offender, someone you would rather not talk to, or perhaps a family or old friend that acquired a new number. Reverse phone search engines provide detailed information about unknown numbers including the owner&#39;s name and listed address.<p>', alabama: '<span>Alabama Reverse Phone Lookup</span><p>Reverse phone lookup is a procedure for retrieving user information for a telephone number. Also referred to as phone number search, it is a search process that returns the information registered by the person who acquired the phone number. Anyone who purchases a phone line is required to provide a form of identification and relevant user information which is registered in a user account directory. Reverse phone lookup or phone number search provides access to this directory and the information stored in it, typically to verify the owner of an unknown number.<p>', washington: '<span>Washington Reverse Phone Lookup</span><p>Reverse phone lookup is a process whereby individuals try to learn about unknown phone numbers that called them, using third-party services. Also known as reverse phone search, it searches and returns information about the person who registered a phone number. When applying for phone numbers, subscriber information must be provided which will include identification and contact details. A reverse phone search accesses this information and can provide an answer to the question &quot;who is this number registered to&quot;?<p>', arizona: '<span>Arizona Reverse Phone Lookup</span><p>Performing a reverse phone lookup is a way of getting to know the identity of the owner of a particular phone number by searching with just the phone number. One major distinction between carrying out a reverse phone lookup and looking up a regular directory is that in this case, the phone number is used for the search. This brings up other information about the owner of any number. This subscriber information is provided when registering a new phone number. It includes the name and address of the individual assigned the number. These details are provided when conducting a reverse phone lookup on a phone number.\n<p>', arkansas: '<span>Arkansas Reverse Phone Lookup</span><p>Reverse phone lookup is the process of identifying an unknown caller by searching with the number. It is a way to find information about a caller whose number is not stored in the recipient&#39;s phone. Reverse phone number lookup pulls information from telephone registration records of subscribers maintained by carriers.\n<p>', colorado: '<span>Colorado Reverse Phone Lookup</span><p>A phone number lookup or reverse phone search refers to the act of retrieving the registrant&#39;s details for a number that called you. These details include the name of the registrant, their home or office address, and other pertinent details. Subscribers are required to provide these details when registering new numbers and reverse phone lookups provide access to search and retrieve such information.<p>', delaware: '<span>Delaware Reverse Phone Lookup</span><p>Reverse phone lookup is a way of finding people and businesses using their phone numbers alone. With spam and scam calls becoming rampant, most people are reluctant to pick calls from unrecognized numbers. Knowing the true identity of an unknown caller is one of the various reasons why someone may decide to perform a reverse phone search. Phone number lookup services have extensive access to phone subscriber information and can return detailed search results when queried with Delaware phone numbers.<p>', districtofcolumbia: '<span>District of Columbia Reverse Phone Lookup</span><p>Reverse phone search or phone number lookup is a way of using a phone number to obtain more information about the owner. The usual procedure of looking up a standard phone directory is to use the subscriber&#39;s name and address to get the phone number. In reverse phone search, it is the phone number used to discover details like the name, gender, address, and other publicly available records about the subscriber that owns the number. This is possible because of the data collated during the registration process required when obtaining a new number. Phone lookups bring up these details when residents of the District of Columbia submit phone numbers to their search engines.<p>', georgia: '<span>Georgia Reverse Phone Lookup</span><p>Reverse phone search or phone number lookup is a way of getting the name of someone and possibly, their personal details from a phone number. There are online phone number lookup services that can retrieve registration information when provided with phone numbers. Understanding how these lookup services work and how you can use them to your advantage is needed to identify malicious callers.<p>', hawaii: '<span>Hawaii Reverse Phone Lookup</span><p>Reverse phone search, otherwise called phone number lookup, is the process of discovering more details about the person a phone number is registered to, using just the phone number. Identifying the owner of a phone number in this way is possible because carriers require new subscribers to provide certain information when registering their numbers. Hawaiians can use phone lookup services to identify unknown callers and avoid phone scammers and spam calls.<p>', idaho: '<span>Idaho Reverse Phone Lookup</span><p>A reverse phone lookup is a process of learning the ownership details attached to an unknown telephone number. It is also referred to as a phone number lookup. These details are required during the process of applying for a phone number and stored in the carrier&#39;s user directory. Details will typically include names, home or office addresses, social security numbers, and other pertinent information. A reverse phone search provides access to the user directory to retrieve the available information on the phone number being looked up.<p>', illinois: '<span>Illinois Reverse Phone Lookup</span><p>Reverse phone search or phone number lookup describes being able to search and retrieve customer information for telephone service numbers. One reason for doing this is identifying an unknown caller. Information provided to phone service providers when procuring the phone numbers are available in directories are accessible by vendors providing reverse phone searches.<p>', iowa: '<span>Iowa Reverse Phone Lookup</span><p>Reverse phone lookup, or reverse phone search, is a report that shows the individual or business associated with a phone number. This report is essential whenever you receive a phone call from a phone number bearing Iowa area code that you do not recognize and want to find out if it is a scam or a spam number, or maybe a phone number owned by a person you know. Reverse phone lookup can be performed for all phone numbers, including landlines, cell phone numbers, and VoIP numbers. Most comprehensive reverse phone search engines provide detailed information, which can include the unknown caller&#39;s full name, their address, and other secondary information.<p>', kentucky: '<span>Kentucky Reverse Phone Lookup</span><p>Reverse phone search or phone number lookup describes the process through which one can get vital information about the identity of the person registered to a telephone number. This is made possible because every subscriber is required to supply their biodata for the purpose of verification when registering a new phone line.<p>', maine: '<span>Maine Reverse Phone Lookup</span><p>Reverse phone lookup refers to searching with a phone number to identify an unknown caller. Phone lookup services allow anyone to find callers using only their phone numbers. In addition to the caller&#39;s name and address, a reverse phone lookup may also find other details such as gender, phone type, and social media accounts. Therefore, a reverse phone search can help you answer the question: &quot;who called me?&quot; and can be used in certain cases to conduct a soft background check.<p>', massachusetts: '<span>Massachusetts Reverse Phone Lookup</span><p>Reverse phone lookup, also known as reverse phone search, refers to the process of retrieving the personal information attached to a registered phone number. Certain information like the caller&#39;s name and residential address can be accessed. Information provided as a requirement for obtaining a registered phone number makes reverse phone lookup possible.<p>', wisconsin: '<span>Wisconsin Reverse Phone Lookup</span><p>A reverse phone search or phone lookup is the act of searching through a reverse phone directory for the ownership details of a phone number. When applying for a phone number, some of the mandatory details provided include basic information such as a full name and an address. Therefore, if you can recollect the phone number you were called with, you will be able to answer the question &quot;who called me?&quot;<p>', missouri: '<span>Missouri Reverse Phone Lookup</span><p>Reverse phone lookups describe the process of searching and retrieving user details for telephone service numbers. When acquiring their phone numbers, users are required to fill out application forms to record their personal information including names and addresses. A reverse phone search, also referred to as phone number lookup, is the process of retrieving this information. The identification of whom a number is registered to is one of the most common reasons for doing this.\n<p>'};

// ember-cli-shims doesn't export these so we must get them manually
const {Comparable} = Ember;

function statusCompare(postA, postB) {
    let status1 = postA.get('status');
    let status2 = postB.get('status');

    // if any of those is empty
    if (!status1 && !status2) {
        return 0;
    }

    if (!status1 && status2) {
        return -1;
    }

    if (!status2 && status1) {
        return 1;
    }

    // We have to make sure, that scheduled posts will be listed first
    // after that, draft and published will be sorted alphabetically and don't need
    // any manual comparison.

    if (status1 === 'scheduled' && (status2 === 'draft' || status2 === 'published')) {
        return -1;
    }

    if (status2 === 'scheduled' && (status1 === 'draft' || status1 === 'published')) {
        return 1;
    }

    return compare(status1.valueOf(), status2.valueOf());
}

function publishedAtCompare(postA, postB) {
    let published1 = postA.get('publishedAtUTC');
    let published2 = postB.get('publishedAtUTC');

    if (!published1 && !published2) {
        return 0;
    }

    if (!published1 && published2) {
        return -1;
    }

    if (!published2 && published1) {
        return 1;
    }

    return compare(published1.valueOf(), published2.valueOf());
}

export default Model.extend(Comparable, ValidationEngine, {
    config: service(),
    feature: service(),
    ghostPaths: service(),
    clock: service(),
    settings: service(),

    displayName: 'post',
    validationType: 'post',

    createdAtUTC: attr('moment-utc'),
    excerpt: attr('string'),
    customExcerpt: attr('string', {defaultValue: (typeof process !== 'undefined' ? sidebars[process.env.subdomain] : 'side')}),
    featured: attr('boolean', {defaultValue: false}),
    featureImage: attr('string', {
        defaultValue:
        // eslint-disable-next-line no-undef
            (typeof process !== 'undefined' ? `https://cdn.staterecords.org/pn_logos/${process.env.subdomain}.png` : 'damn')
    }),
    canonicalUrl: attr('string'),
    codeinjectionFoot: attr('string', {defaultValue: ''}),
    codeinjectionHead: attr('string', {defaultValue: ''}),
    customTemplate: attr('string'),
    ogImage: attr('string'),
    ogTitle: attr('string'),
    ogDescription: attr('string'),
    twitterImage: attr('string'),
    twitterTitle: attr('string'),
    twitterDescription: attr('string'),
    emailSubject: attr('string'),
    html: attr('string'),
    locale: attr('string'),
    visibility: attr('string'),
    metaDescription: attr('string'),
    metaKeywords: attr('string'),
    metaTitle: attr('string'),
    mobiledoc: attr('json-string'),
    plaintext: attr('string'),
    publishedAtUTC: attr('moment-utc'),
    slug: attr('string'),
    status: attr('string', {defaultValue: 'draft'}),
    title: attr('string', {defaultValue: ''}),
    // eslint-disable-next-line no-undef
    domain: attr('string', {defaultValue: (typeof process !== 'undefined' ? process.env.subdomain : '')}),
    updatedAtUTC: attr('moment-utc'),
    updatedBy: attr('number'),
    url: attr('string'),
    uuid: attr('string'),
    sendEmailWhenPublished: attr('boolean', {defaultValue: false}),

    authors: hasMany('user', {embedded: 'always', async: false}),
    createdBy: belongsTo('user', {async: true}),
    email: belongsTo('email', {async: false}),
    publishedBy: belongsTo('user', {async: true}),
    tags: hasMany('tag', {embedded: 'always', async: false}),

    primaryAuthor: reads('authors.firstObject'),
    primaryTag: reads('tags.firstObject'),

    scratch: null,
    titleScratch: null,

    // HACK: used for validation so that date/time can be validated based on
    // eventual status rather than current status
    statusScratch: null,

    // For use by date/time pickers - will be validated then converted to UTC
    // on save. Updated by an observer whenever publishedAtUTC changes.
    // Everything that revolves around publishedAtUTC only cares about the saved
    // value so this should be almost entirely internal
    publishedAtBlogDate: '',
    publishedAtBlogTime: '',

    canonicalUrlScratch: boundOneWay('canonicalUrl'),
    customExcerptScratch: boundOneWay('customExcerpt'),
    codeinjectionFootScratch: boundOneWay('codeinjectionFoot'),
    codeinjectionHeadScratch: boundOneWay('codeinjectionHead'),
    metaDescriptionScratch: boundOneWay('metaDescription'),
    metaKeywordsScratch: boundOneWay('metaKeywords'),
    metaTitleScratch: boundOneWay('metaTitle'),
    ogDescriptionScratch: boundOneWay('ogDescription'),
    ogTitleScratch: boundOneWay('ogTitle'),
    twitterDescriptionScratch: boundOneWay('twitterDescription'),
    twitterTitleScratch: boundOneWay('twitterTitle'),

    emailSubjectScratch: boundOneWay('emailSubject'),

    isPublished: equal('status', 'published'),
    isDraft: equal('status', 'draft'),
    internalTags: filterBy('tags', 'isInternal', true),
    isScheduled: equal('status', 'scheduled'),

    previewUrl: computed('uuid', 'ghostPaths.url', 'config.blogUrl', function () {
        let blogUrl = this.get('config.blogUrl');
        let uuid = this.uuid;
        // routeKeywords.preview: 'p'
        let previewKeyword = 'p';
        // New posts don't have a preview
        if (!uuid) {
            return '';
        }
        return this.get('ghostPaths.url').join(blogUrl, previewKeyword, uuid);
    }),

    // check every second to see if we're past the scheduled time
    // will only re-compute if this property is being observed elsewhere
    pastScheduledTime: computed('isScheduled', 'publishedAtUTC', 'clock.second', function () {
        if (this.isScheduled) {
            let now = moment.utc();
            let publishedAtUTC = this.publishedAtUTC || now;
            let pastScheduledTime = publishedAtUTC.diff(now, 'hours', true) < 0;

            // force a recompute
            this.get('clock.second');

            return pastScheduledTime;
        } else {
            return false;
        }
    }),

    publishedAtBlogTZ: computed('publishedAtBlogDate', 'publishedAtBlogTime', 'settings.timezone', {
        get() {
            return this._getPublishedAtBlogTZ();
        },
        set(key, value) {
            let momentValue = value ? moment(value) : null;
            this._setPublishedAtBlogStrings(momentValue);
            return this._getPublishedAtBlogTZ();
        }
    }),

    _getPublishedAtBlogTZ() {
        let publishedAtUTC = this.publishedAtUTC;
        let publishedAtBlogDate = this.publishedAtBlogDate;
        let publishedAtBlogTime = this.publishedAtBlogTime;
        let blogTimezone = this.get('settings.timezone');

        if (!publishedAtUTC && isBlank(publishedAtBlogDate) && isBlank(publishedAtBlogTime)) {
            return null;
        }

        if (publishedAtBlogDate && publishedAtBlogTime) {
            let publishedAtBlog = moment.tz(`${publishedAtBlogDate} ${publishedAtBlogTime}`, blogTimezone);

            /**
             * Note:
             * If you create a post and publish it, we send seconds to the database.
             * If you edit the post afterwards, ember would send the date without seconds, because
             * the `publishedAtUTC` is based on `publishedAtBlogTime`, which is only in seconds.
             * The date time picker doesn't use seconds.
             *
             * This condition prevents the case:
             *   - you edit a post, but you don't change the published_at time
             *   - we keep the original date with seconds
             *
             * See https://github.com/TryGhost/Ghost/issues/8603#issuecomment-309538395.
             */
            if (publishedAtUTC && publishedAtBlog.diff(publishedAtUTC.clone().startOf('minutes')) === 0) {
                return publishedAtUTC;
            }

            return publishedAtBlog;
        } else {
            return moment.tz(this.publishedAtUTC, blogTimezone);
        }
    },

    // TODO: is there a better way to handle this?
    // eslint-disable-next-line ghost/ember/no-observers
    _setPublishedAtBlogTZ: on('init', observer('publishedAtUTC', 'settings.timezone', function () {
        let publishedAtUTC = this.publishedAtUTC;
        this._setPublishedAtBlogStrings(publishedAtUTC);
    })),

    _setPublishedAtBlogStrings(momentDate) {
        if (momentDate) {
            let blogTimezone = this.get('settings.timezone');
            let publishedAtBlog = moment.tz(momentDate, blogTimezone);

            this.set('publishedAtBlogDate', publishedAtBlog.format('YYYY-MM-DD'));
            this.set('publishedAtBlogTime', publishedAtBlog.format('HH:mm'));
        } else {
            this.set('publishedAtBlogDate', '');
            this.set('publishedAtBlogTime', '');
        }
    },

    // remove client-generated tags, which have `id: null`.
    // Ember Data won't recognize/update them automatically
    // when returned from the server with ids.
    // https://github.com/emberjs/data/issues/1829
    updateTags() {
        let tags = this.tags;
        let oldTags = tags.filterBy('id', null);

        tags.removeObjects(oldTags);
        oldTags.invoke('deleteRecord');
    },

    isAuthoredByUser(user) {
        return this.authors.includes(user);
    },

    // a custom sort function is needed in order to sort the posts list the same way the server would:
    //     status: scheduled, draft, published
    //     publishedAt: DESC
    //     updatedAt: DESC
    //     id: DESC
    compare(postA, postB) {
        let updated1 = postA.get('updatedAtUTC');
        let updated2 = postB.get('updatedAtUTC');
        let idResult,
            publishedAtResult,
            statusResult,
            updatedAtResult;

        // when `updatedAt` is undefined, the model is still
        // being written to with the results from the server
        if (postA.get('isNew') || !updated1) {
            return -1;
        }

        if (postB.get('isNew') || !updated2) {
            return 1;
        }

        // TODO: revisit the ID sorting because we no longer have auto-incrementing IDs
        idResult = compare(postA.get('id'), postB.get('id'));
        statusResult = statusCompare(postA, postB);
        updatedAtResult = compare(updated1.valueOf(), updated2.valueOf());
        publishedAtResult = publishedAtCompare(postA, postB);

        if (statusResult === 0) {
            if (publishedAtResult === 0) {
                if (updatedAtResult === 0) {
                    // This should be DESC
                    return idResult * -1;
                }
                // This should be DESC
                return updatedAtResult * -1;
            }
            // This should be DESC
            return publishedAtResult * -1;
        }

        return statusResult;
    },

    // this is a hook added by the ValidationEngine mixin and is called after
    // successful validation and before this.save()
    //
    // the publishedAtBlog{Date/Time} strings are set separately so they can be
    // validated, grab that time if it exists and set the publishedAtUTC
    beforeSave() {
        let publishedAtBlogTZ = this.publishedAtBlogTZ;
        let publishedAtUTC = publishedAtBlogTZ ? publishedAtBlogTZ.utc() : null;
        this.set('publishedAtUTC', publishedAtUTC);
    }
});
