//
//  SignUpViewController.swift
//  Project Runaway
//
//  Created by DeQuan Burnside on 2/26/17.
//  Copyright © 2017 se329. All rights reserved.
//

import UIKit

// MARK: -
// TODO: -
// FIXME: -

class SignUpViewController: UIViewController {
    
    @IBOutlet weak var emailTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!

    @IBOutlet weak var confirmPasswordTextField: UITextField!
    
    @IBAction func toLogInViewController(_ sender: Any) {
    }
    
    @IBOutlet weak var btn_box: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func btn_box(sender: UIButton) {
        if (btn_box.isSelected == true)
        {
            btn_box.setBackgroundImage(UIImage(named: "Checked"), for: UIControlState.normal)
            
            btn_box.isSelected = false;
        }
        else
        {
            btn_box.setBackgroundImage(UIImage(named: "Unchecked"), for: UIControlState.normal)
            
            btn_box.isSelected = true;
        }
    }

    
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
