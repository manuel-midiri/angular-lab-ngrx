import { animate, query, style, transition, trigger } from "@angular/animations";

export const slideAnimation =     
  trigger('routerTransition', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ transform: 'translateX(100%)', opacity: 0 })]),
      query(':leave', animate('500ms', style({ transform: 'translateX(-100%)', opacity: 0 }))),
      query(':enter', animate('500ms', style({ transform: 'translateX(0%)', opacity: 1 }))),
    ]),
]);
