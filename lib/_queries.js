import { gql } from 'graphql-request'

const blogPageQuery = gql`
  fragment BlogPostFields on BlogPost {
    id
    authors {
      id
      name
      photo {
        id
        url
      }
      role
    }
    category
    content
    coverImage {
      id
      handle
      height
      url
      width
    }
    excerpt
    published
    slug
    title
  }

  query BlogPageQuery($locale: Locale!) {
    page(locales: [$locale, en], where: { slug: "blog" }) {
      id
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      navigation {
        id
        slug
        pages(where: { slug_not: "home" }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
        id
        description
        image {
          id
          handle
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
      subtitle
      title
    }
    posts: blogPosts(orderBy: published_DESC) {
      ...BlogPostFields
    }
  }
`

const blogPostQuery = gql`
  query BlogPostQuery($locale: Locale!, $slug: String!) {
    allPosts: blogPosts(locales: [$locale, en], orderBy: published_ASC) {
      id
      slug
      title
    }
    page(where: { slug: "blog" }) {
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      navigation {
        id
        slug
        pages(where: { slug_not: "home" }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
        id
        description
        image {
          id
          handle
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
    }
    post: blogPost(where: { slug: $slug }) {
      id
      authors {
        id
        name
        photo {
          id
          url
        }
        role
      }
      category
      content
      coverImage {
        id
        handle
        height
        url
        width
      }
      excerpt
      published
      seo {
        id
        description
        image {
          id
          handle
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
      slug
      title
    }
  }
`

const pageQuery = gql`
  fragment BaseNavigation on Navigation {
    id
    slug
    pages(where: { slug_not: "home" }) {
      id
      navigationLabel
      slug
    }
  }

  fragment BaseBreakpoint on Breakpoint {
    id
    buttons {
      id
      href
      label
      theme
    }
    subtitle
    title
  }

  fragment BaseGrid on Grid {
    id
    columns {
      __typename
      ... on BlogPost {
        id
        authors {
          id
          name
          photo {
            id
            url
          }
          role
        }
        category
        content
        coverImage {
          id
          handle
          height
          url
          width
        }
        excerpt
        published
        slug
        title
      }
      ... on Faq {
        id
        content
        title
      }
      ... on Feature {
        id
        content
        icon
        image {
          id
          handle
          height
          url
          width
        }
        slug
        title
      }
      ... on Person {
        id
        name
        photo {
          id
          height
          url
          width
        }
        role
      }
      ... on PricingPlan {
        id
        annualPrice
        description
        included
        monthlyPrice
        name
      }
      ... on Stat {
        id
        label
        value
      }
    }
    columnComponent
    component
    gridHeadline: headline
    layout
    slug
    gridSubtitle: subtitle
    gridTag: tag
    theme
    gridTitle: title
    width
  }

  fragment BaseLogoCloud on LogoCloud {
    id
    companies {
      id
      logo {
        id
        height
        url
        width
      }
      name
    }
    logoCloudTitle: title
  }

  fragment BaseTestimonial on Testimonial {
    id
    content
    person {
      id
      name
      company {
        id
        logo {
          id
          height
          url
          width
        }
        name
      }
      photo {
        id
        height
        url
        width
      }
      role
    }
  }

  fragment BaseFooter on Footer {
    id
    primaryLinks {
      id
      navigationLabel
      slug
    }
    secondaryLinks {
      id
      navigationLabel
      slug
    }
    slug
    title
  }

  fragment BaseHero on Hero {
    id
    buttons {
      id
      href
      label
      theme
    }
    image {
      id
      handle
      height
      url
      width
    }
    subtitle
    slug
  }

  fragment BaseBanner on Banner {
    id
    content
    href
    slug
    theme
  }

  fragment BaseNewsletter on Newsletter {
    id
    ctaLabel
    subtitle
    title
  }

  fragment NinetailedAudience on Nt_audience {
    id: nt_audience_id
  }

  query PageQuery($locale: Locale!, $slug: String!) {
    page(locales: [$locale, en], where: { slug: $slug }) {
      blocks {
        __typename
        ... on Breakpoint {
          ...BaseBreakpoint
          variants: nt_variants {
            ...BaseBreakpoint
            audience: nt_audience {
              ...NinetailedAudience
            }
          }
        }
        ... on Grid {
          ...BaseGrid
          variants: nt_variants {
            ...BaseGrid
            audience: nt_audience {
              ...NinetailedAudience
            }
          }
        }
        ... on LogoCloud {
          ...BaseLogoCloud
          variants: nt_variants {
            ...BaseLogoCloud
            audience: nt_audience {
              ...NinetailedAudience
            }
          }
        }
        ... on Testimonial {
          ...BaseTestimonial
          variants: nt_variants {
            ...BaseTestimonial
            audience: nt_audience {
              ...NinetailedAudience
            }
          }
        }
      }
      footer {
        ...BaseFooter
        variants: nt_variants {
          ...BaseFooter
          audience: nt_audience {
            ...NinetailedAudience
          }
        }
      }
      hero {
        ...BaseHero
        variants: nt_variants {
          ...BaseHero
          audience: nt_audience {
            ...NinetailedAudience
          }
        }
      }
      id
      marketing {
        __typename
        ... on Banner {
          ...BaseBanner
          variants: nt_variants {
            ...BaseBanner
            audience: nt_audience {
              ...NinetailedAudience
            }
          }
        }
        ... on Newsletter {
          ...BaseNewsletter
          variants: nt_variants {
            ...BaseNewsletter
            audience: nt_audience {
              ...NinetailedAudience
            }
          }
        }
      }
      navigation {
        ...BaseNavigation
        variants: nt_variants {
          ...BaseNavigation
          audience: nt_audience {
            ...NinetailedAudience
          }
        }
      }
      seo {
        id
        description
        image {
          id
          handle
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
      subtitle
      title
    }
  }
`

export { blogPageQuery, blogPostQuery, pageQuery }
