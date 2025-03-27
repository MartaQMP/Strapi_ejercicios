import type { Schema, Struct } from '@strapi/strapi';

export interface AdditionalDetailsClassDetails extends Struct.ComponentSchema {
  collectionName: 'components_additional_details_class_details';
  info: {
    displayName: 'Class_details';
    icon: 'bulletList';
  };
  attributes: {
    Classroom: Schema.Attribute.RichText;
    Schedule: Schema.Attribute.RichText;
  };
}

export interface AdditionalDetailsEventsDetails extends Struct.ComponentSchema {
  collectionName: 'components_additional_details_events_details';
  info: {
    description: '';
    displayName: 'Events_details';
    icon: 'apps';
  };
  attributes: {
    Date: Schema.Attribute.Date;
    Place: Schema.Attribute.RichText;
    Time: Schema.Attribute.Time;
  };
}

export interface AdditionalDetailsTeacherDetails
  extends Struct.ComponentSchema {
  collectionName: 'components_additional_details_teacher_details';
  info: {
    displayName: 'Teacher_details';
    icon: 'dashboard';
  };
  attributes: {
    Experience: Schema.Attribute.RichText;
    Speciality: Schema.Attribute.RichText;
  };
}

export interface ComponentsEventsComponent extends Struct.ComponentSchema {
  collectionName: 'components_components_events_components';
  info: {
    displayName: 'Component';
    icon: 'alien';
  };
  attributes: {
    Content: Schema.Attribute.RichText;
  };
}

export interface ComponentsEventsGalleryImages extends Struct.ComponentSchema {
  collectionName: 'components_components_events_gallery_images';
  info: {
    displayName: 'Gallery_images';
    icon: 'landscape';
  };
  attributes: {
    Media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface ComponentsEventsUrlList extends Struct.ComponentSchema {
  collectionName: 'components_components_events_url_lists';
  info: {
    displayName: 'URL_list';
    icon: 'cursor';
  };
  attributes: {
    Tittle: Schema.Attribute.String;
    Url: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'additional-details.class-details': AdditionalDetailsClassDetails;
      'additional-details.events-details': AdditionalDetailsEventsDetails;
      'additional-details.teacher-details': AdditionalDetailsTeacherDetails;
      'components-events.component': ComponentsEventsComponent;
      'components-events.gallery-images': ComponentsEventsGalleryImages;
      'components-events.url-list': ComponentsEventsUrlList;
    }
  }
}
