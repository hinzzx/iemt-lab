/**
 * Smooth scroll navigation utility
 * Handles hash-based navigation with bulletproof scrolling behavior
 */

export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior, block: 'start' });
    // Update URL hash without triggering navigation
    window.history.pushState(null, '', `#${sectionId}`);
  }
}

export function handleSectionNavigation(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
) {
  // Check if it's a hash link
  const url = new URL(href, window.location.origin);
  const hash = url.hash;
  
  // If it's a hash on the current page or home page
  if (hash && (url.pathname === window.location.pathname || url.pathname === '/')) {
    e.preventDefault();
    
    // Remove the # to get the section ID
    const sectionId = hash.slice(1);
    
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== '/') {
      window.location.href = href;
      return;
    }
    
    // Call the onNavigate callback (e.g., to close mobile menu)
    onNavigate?.();
    
    // Small delay to ensure menu closes smoothly
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
    
    return;
  }
  
  // For non-hash links, let default behavior happen but call callback
  onNavigate?.();
}

/**
 * Handle navigation on page load (when arriving with a hash)
 */
export function handleInitialHash() {
  if (window.location.hash) {
    const sectionId = window.location.hash.slice(1);
    // Delay to ensure page is fully loaded
    setTimeout(() => {
      scrollToSection(sectionId, 'auto');
    }, 100);
  }
}
