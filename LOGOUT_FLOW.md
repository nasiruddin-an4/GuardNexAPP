# Logout Flow Documentation

## Overview
The logout functionality has been successfully implemented and integrated with the sign-in page.

## How It Works

### 1. **Logout Button Location**
The logout button is located in the **Settings** page at:
- **Path**: `app/(tabs)/settings.tsx`
- **Visual**: Red gradient button at the bottom of the settings screen
- **Icon**: Logout icon with "Logout" text

### 2. **Logout Flow**

```
User clicks "Logout" button
        ↓
Confirmation alert appears
        ↓
User confirms logout
        ↓
App data is reset (resetApp())
        ↓
Navigate to Sign In page
```

### 3. **What Happens During Logout**

When a user logs out, the following actions occur:

1. **Confirmation Dialog**
   - Alert asks: "Are you sure you want to logout?"
   - Options: "Cancel" or "Logout"

2. **Data Reset** (via `resetApp()`)
   - User state is cleared (`setUserState(null)`)
   - Onboarding status is reset (`setIsOnboarded(false)`)
   - Messages are reset to mock data
   - All stored data is cleared from AsyncStorage

3. **Navigation**
   - User is redirected to the **Sign In page** (`/(auth)/signin`)
   - Previous navigation stack is replaced (can't go back)

### 4. **Code Implementation**

**Location**: `app/(tabs)/settings.tsx` (lines 27-43)

```typescript
const handleLogout = () => {
    Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await resetApp();
                    router.replace('/(auth)/signin' as any);
                },
            },
        ]
    );
};
```

### 5. **User Experience**

#### **Before Logout**:
- User is logged in
- Can access all app features
- User data is stored

#### **After Logout**:
- All user data is cleared
- Redirected to Sign In page
- Can sign in again with credentials
- Can use biometric authentication (if previously set up)
- Can navigate to Sign Up or Forgot Password

### 6. **Sign In Options After Logout**

Once logged out, users can sign back in using:
1. **Email & Password**
2. **Biometric Authentication** (Face ID/Fingerprint)
3. **Social Login** (Google/Apple)
4. **Create New Account** (Sign Up)
5. **Reset Password** (Forgot Password)

### 7. **Security Features**

- ✅ **Confirmation Required**: Prevents accidental logouts
- ✅ **Complete Data Wipe**: All sensitive data is removed
- ✅ **No Back Navigation**: Can't navigate back to authenticated screens
- ✅ **Clean State**: App starts fresh on next login

### 8. **Testing the Logout Flow**

1. **Navigate to Settings**:
   ```typescript
   // From anywhere in the app
   router.push('/(tabs)/settings');
   ```

2. **Click Logout Button**:
   - Scroll to bottom of settings page
   - Tap the red "Logout" button

3. **Confirm Logout**:
   - Tap "Logout" in the confirmation dialog

4. **Verify**:
   - Should be on Sign In page
   - User data should be cleared
   - Can sign in again

### 9. **Related Files**

- **Settings Page**: `app/(tabs)/settings.tsx`
- **Sign In Page**: `app/(auth)/signin.tsx`
- **App Context**: `src/contexts/AppContext.tsx`
- **Storage Utils**: `src/utils/storage.ts`

### 10. **Navigation Routes**

```typescript
// Logout navigation
router.replace('/(auth)/signin');

// Alternative routes (if needed)
router.replace('/(auth)/signup');      // Go to sign up
router.replace('/(auth)/forgot-password'); // Go to forgot password
router.replace('/(auth)/onboarding');  // Go to onboarding
```

---

## Summary

✅ **Logout button** is in Settings page  
✅ **Confirmation dialog** prevents accidents  
✅ **Complete data reset** ensures security  
✅ **Navigates to Sign In page** for re-authentication  
✅ **All authentication methods** available after logout  
✅ **Clean, secure logout flow** implemented  

The logout functionality is **production-ready** and provides a secure, user-friendly experience! 🎉
