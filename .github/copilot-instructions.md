You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices
- Always use standalone components over NgModules
- Don't use explicit `standalone: true` (it is implied by default)
- Use signals for state management
- Implement lazy loading for feature routes
- Use `NgOptimizedImage` for all static images.

## Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead

## State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable

## Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## ionic standalone components
- Use Ionic standalone components for UI elements
- on use ionic components, add components to the `imports` array of the parent component

## ionic icons 
- Use Ionic icons for consistent UI
- on use ionic icons, add in addIcons({icon-name}) function in the `constructor` app.component

# Angular  

Angular — Deliver web apps with confidence 🚀

## Table of Contents

- [What is Angular](https://angular.dev/overview)
- [Installation guide](https://angular.dev/installation)
- [Style Guide](https://next.angular.dev/style-guide)

## Components

- [What is a component](https://angular.dev/guide/components)
- [Component selectors](https://angular.dev/guide/components/selectors)
- [Styling components](https://angular.dev/guide/components/styling)
- [Accepting data with input properties](https://angular.dev/guide/components/inputs)
- [Custom events with output](https://angular.dev/guide/components/outputs)
- [Content projection](https://angular.dev/guide/components/content-projection)
- [Component lifecycle](https://angular.dev/guide/components/lifecycle)

## Templates guides

- [Template Overview](https://angular.dev/guide/templates)
- [Adding event listeners](https://angular.dev/guide/templates/event-listeners)
- [Binding text, properties and attributes](https://angular.dev/guide/templates/binding)
- [Control Flow](https://angular.dev/guide/templates/control-flow)
- [Template variable declaration](https://angular.dev/guide/templates/variables)
- [Deferred loading of components](https://angular.dev/guide/templates/defer) 
- [Expression syntax](https://angular.dev/guide/templates/expression-syntax)

## Directives

- [Directives overview](https://angular.dev/guide/directives)
- [Attribute directives](https://angular.dev/guide/directives/attribute-directives)
- [Structural directives](https://angular.dev/guide/directives/structural-directives)
- [Directive composition](https://angular.dev/guide/directives/directive-composition-api)
- [Optimizing images](https://angular.dev/guide/image-optimization)

## Signals 

- [Signals overview](https://angular.dev/guide/signals)
- [Dependent state with linkedSignal](https://angular.dev/guide/signals/linked-signal)
- [Async reactivity with resources](https://angular.dev/guide/signals/resource)

## Dependency injection (DI)

- [Dependency Injection overview](https://angular.dev/guide/di)
- [Understanding Dependency injection](https://angular.dev/guide/di/dependency-injection)
- [Creating an injectable service](https://angular.dev/guide/di/creating-injectable-service)
- [Configuring dependency providers](https://angular.dev/guide/di/dependency-injection-providers)
- [Injection context](https://angular.dev/guide/di/dependency-injection-context)
- [Hierarchical injectors](https://angular.dev/guide/di/hierarchical-dependency-injection)
- [Optimizing Injection tokens](https://angular.dev/guide/di/lightweight-injection-tokens)

## RxJS 

- [RxJS interop with Angular signals](https://angular.dev/ecosystem/rxjs-interop)
- [Component output interop](https://angular.dev/ecosystem/rxjs-interop/output-interop)

## Loading Data

- [HttpClient overview](https://angular.dev/guide/http)
- [Setting up the HttpClient](https://angular.dev/guide/http/setup)
- [Making requests](https://angular.dev/guide/http/making-requests)
- [Intercepting requests](https://angular.dev/guide/http/interceptors)
- [Testing](https://angular.dev/guide/http/testing)

## Forms
- [Forms overview](https://angular.dev/guide/forms)
- [Reactive Forms](https://angular.dev/guide/forms/reactive-forms)
- [Strictly types forms](https://angular.dev/guide/forms/typed-forms)
- [Template driven forms](https://angular.dev/guide/forms/template-driven-forms)
- [Validate forms input](https://angular.dev/guide/forms/form-validation)
- [Building dynamic forms](https://angular.dev/guide/forms/dynamic-forms)

## Routing
- [Routing overview](https://angular.dev/guide/routing)
- [Define routes](https://angular.dev/guide/routing/define-routes)
- [Show routes with outlets](https://angular.dev/guide/routing/show-routes-with-outlets)
- [Navigate to routes](https://angular.dev/guide/routing/navigate-to-routes)
- [Read route state](https://angular.dev/guide/routing/read-route-state)
- [Common routing tasks](https://angular.dev/guide/routing/common-router-tasks)
- [Creating custom route matches](https://angular.dev/guide/routing/routing-with-urlmatcher)

## Server Side Rendering (SSR)

- [SSR Overview](https://angular.dev/guide/performance)
- [SSR with Angular](https://angular.dev/guide/ssr)
- [Build-time prerendering (SSG)](https://angular.dev/guide/prerendering)
- [Hybrid rendering with server routing](https://angular.dev/guide/hybrid-rendering)
- [Hydration](https://angular.dev/guide/hydration)
- [Incremental Hydration](https://angular.dev/guide/incremental-hydration)

# CLI 
[Angular CLI Overview](https://angular.dev/tools/cli)

## Testing

- [Testing overview](https://angular.dev/guide/testing)
- [Testing coverage](https://angular.dev/guide/testing/code-coverage)
- [Testing services](https://angular.dev/guide/testing/services)
- [Basics of component testing](https://angular.dev/guide/testing/components-basics)
- [Component testing scenarios](https://angular.dev/guide/testing/components-scenarios)
- [Testing attribute directives](https://angular.dev/guide/testing/attribute-directives)
- [Testing pipes](https://angular.dev/guide/testing/pipes)
- [Debugging tests](https://angular.dev/guide/testing/debugging)
- [Testing utility apis](https://angular.dev/guide/testing/utility-apis)
- [Component harness overview](https://angular.dev/guide/testing/component-harnesses-overview)
- [Using component harness in tests](https://angular.dev/guide/testing/using-component-harnesses)
- [Creating a component harness for your components](https://angular.dev/guide/testing/creating-component-harnesses)

## Animations
- [Animations your content](https://angular.dev/guide/animations/css)
- [Route transition animation](https://angular.dev/guide/animations/route-animations)
- [Migrating to native CSS animations](https://next.angular.dev/guide/animations/migration)

## APIs
- [API reference](https://angular.dev/api)
- [CLI command reference](https://angular.dev/cli)


## Others

- [Zoneless](https://angular.dev/guide/zoneless)
- [Error encyclopedia](https://angular.dev/errors)
- [Extended diagnostics](https://angular.dev/extended-diagnostics)
- [Update guide](https://angular.dev/update-guide)
- [Contribute to Angular](https://github.com/angular/angular/blob/main/CONTRIBUTING.md)
- [Angular's Roadmap](https://angular.dev/roadmap)
- [Keeping your projects up-to-date](https://angular.dev/update)
- [Internationalization (i18n)](https://angular.dev/guide/i18n)

## Ionic component
- [Ionic Angular components](https://ionicframework.com/docs/angular/components)
- [Ionic Angular documentation](https://ionicframework.com/docs/angular)
- [Ionic Angular CLI](https://ionicframework.com/docs/cli/commands/angular)
- [Ionic Angular theming](https://ionicframework.com/docs/theming/angular)
- [Ionic Angular animations](https://ionicframework.com/docs/angular/animations)


## Ionic Icons
- [Ionic Icons documentation](https://ionicframework.com/docs/ionicons)

## example read data

title: COLLECTIONS_NAMES = 'products';
{{ rxCollection }} = this.dbService.db.collections.{{COLLECTIONS_NAMES}};
{{query}} = signal<MangoQuery<{{listInterfaceWithBaseDoc}}>>({});

{{listName}} = rxResource({
    request: () => this.{{query}}(),
    loader: ({ request }) => this.{{rxCollection}}.find(request).$,
    defaultValue: []
 });